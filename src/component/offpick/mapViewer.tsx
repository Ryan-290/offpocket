'use client'

import { useEffect, useRef, useState } from 'react'

interface Content {
  id: string
  title: string
  latitude: number
  longitude: number
}

interface MapViewerProps {
  contents: Content[]
  onVisibleChange?: (visibleContents: Content[]) => void // ✅ 부모에게 현재 보이는 콘텐츠 전달
}

declare global {
  interface Window {
    kakao: any
  }
}

export default function MapViewer({ contents, onVisibleChange }: MapViewerProps) {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const [map, setMap] = useState<any>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  // SDK 로드
  useEffect(() => {
    if (window.kakao?.maps) {
      setScriptLoaded(true)
      return
    }


    const script = document.createElement('script')
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=clusterer`
    script.async = true
    script.onload = () => {
      window.kakao.maps.load(() => {
        setScriptLoaded(true)
      })
    }
    document.head.appendChild(script)
  }, [])

  // 지도 생성
  useEffect(() => {
    if (!scriptLoaded || map || !mapRef.current) return

    const kakao = window.kakao
    const mapInstance = new kakao.maps.Map(mapRef.current, {
      center: new kakao.maps.LatLng(37.5665, 126.9780),
      level: 7,
    })

    setMap(mapInstance)
  }, [scriptLoaded, map])

  // 마커 + 클러스터 + 이벤트 처리
  useEffect(() => {
    if (!map || !window.kakao?.maps) return

    const kakao = window.kakao
    const markerMap = new Map<any, Content>()

    // 1. 마커 생성 (같은 좌표면 살짝 offset)
    const markers = contents.map((content, index) => {
      const offset = 0.00005 * index
      const position = new kakao.maps.LatLng(
        content.latitude + offset,
        content.longitude + offset
      )

      const marker = new kakao.maps.Marker({ position })
      const infoWindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px; white-space:nowrap;">${content.title}</div>`,
      })

      kakao.maps.event.addListener(marker, 'mouseover', () => {
        infoWindow.open(map, marker)
      })

      kakao.maps.event.addListener(marker, 'mouseout', () => {
        infoWindow.close()
      })

      kakao.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(map, marker)
      })

      markerMap.set(marker, content)
      return marker
    })

    // 2. 클러스터러 생성
    const clusterer = new kakao.maps.MarkerClusterer({
      map,
      markers,
      gridSize: 60,
      averageCenter: true,
      minLevel: 6,
    })

    // 3. 클러스터 클릭 시 내부 콘텐츠 title 보여주기
    kakao.maps.event.addListener(clusterer, 'clusterclick', (cluster: any) => {
      const clusterMarkers = cluster.getMarkers()
      const titles = clusterMarkers
        .map((m: any) => markerMap.get(m)?.title)
        .filter(Boolean)
        .map((title: string) => `<div>${title}</div>`) // 여러 title
        .join('')

      const infoWindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px;">${titles}</div>`,
        position: cluster.getCenter(),
      })
      infoWindow.open(map)
    })

    // 4. idle 시 현재 영역 내 콘텐츠 필터링
    const updateVisible = () => {
      const bounds = map.getBounds()
      const sw = bounds.getSouthWest()
      const ne = bounds.getNorthEast()

      const visible = contents.filter((c) => {
        const lat = c.latitude
        const lng = c.longitude
        return lat >= sw.getLat() && lat <= ne.getLat() && lng >= sw.getLng() && lng <= ne.getLng()
      })

      onVisibleChange?.(visible) // 부모에 전달
    }

    updateVisible()
    kakao.maps.event.addListener(map, 'idle', updateVisible)

    return () => {
      clusterer.clear()
    }
  }, [map, contents ,onVisibleChange])

  return <div ref={mapRef} className="w-full h-[800px] bg-gray-300" />
}