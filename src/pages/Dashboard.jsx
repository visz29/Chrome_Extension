"use client"

import { useState, useEffect, useRef } from "react"
import { getWeather } from "../API/weather"
import history from "../API/history"

// Advanced Dashboard
// Custom Button Component
const Button = ({
  children,
  onClick,
  className = "",
  variant = "default",
  disabled = false,
  type = "button",
  ...props
}) => {
  const baseClasses =
    "px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
  const variants = {
    default: "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700 focus:ring-gray-500",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// Custom Input Component
const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      {...props}
    />
  )
}

// Icon Components
const SearchIcon = ({ className = "" }) => (
  <svg className={` ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
)

const Mic = ({ className = "" }) => (
  <svg className={`${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
    />
  </svg>
)

const Droplets = ({ className = "" }) => (
  <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7.5 14.25c0-1.5 1.5-3 3-3s3 1.5 3 3-1.5 3-3 3-3-1.5-3-3z"
    />
  </svg>
)

const MapPin = ({ className = "" }) => (
  <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const Sun = ({ className = "" }) => (
  <svg className={`w-12 h-12 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
)

const X = ({ className = "" }) => (
  <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const Trash2 = ({ className = "" }) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="3,6 5,6 21,6" />
    <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
)

// Analog Clock Component
function AnalogClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const hours = time.getHours()* 30
  const minutes = time.getMinutes() * 6 
  const seconds = time.getSeconds()

  // console.log("hours",hours);
  
  const hourAngle = (hours+(minutes/12));
  const minuteAngle = minutes 
  const secondAngle = seconds * 6 

  return (
   <div className="relative w-50 h-50">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Clock face */}
        <circle cx="50" cy="50" r="48" fill="transparent" stroke="none" />

        {Array.from({ length: 60 }, (_, i) => {
          const angle = i * 6 - 90
          const isHourMark = i % 5 === 0
          const length = isHourMark ? 6 : 3
          const strokeWidth = isHourMark ? 2 : 1
          const x1 = 50 + (48 - length) * Math.cos((angle * Math.PI) / 180)
          const y1 = 50 + (48 - length) * Math.sin((angle * Math.PI) / 180)
          const x2 = 50 + 48 * Math.cos((angle * Math.PI) / 180)
          const y2 = 50 + 48 * Math.sin((angle * Math.PI) / 180)

          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6b7280" strokeWidth={strokeWidth} />
        })}

        {Array.from({ length: 12 }, (_, i) => {
          const hour = i === 0 ? 12 : i
          const angle = i * 30 - 90
          const x = 50 + 35 * Math.cos((angle * Math.PI) / 180)
          const y = 50 + 35 * Math.sin((angle * Math.PI) / 180)

          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="8"
              fill="#8a8889"
              fontWeight="600"
            >
              {hour}
            </text>
          )
        })}

        {/* 12 o'clock dot */}
        <circle cx="50" cy="8" r="3" fill="#3b82f6" />

        {/* Hour hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="30"
          stroke="#3b82f6"
          strokeWidth="4"
          strokeLinecap="round"
          transform={`rotate(${hourAngle} 50 50)`}
          className="transition-all duration-300"
          />

        {/* Minute hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="15"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinecap="round"
          transform={`rotate(${minuteAngle} 50 50)`}
          className="transition-all duration-300"
          />

        {/* Seconds hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="12"
          stroke="#ef4444"
          strokeWidth="1"
          strokeLinecap="round"
          transform={`rotate(${secondAngle} 50 50)`}
          className="transition-all duration-300"
        />

        {/* Center dot */}
        <circle cx="50" cy="50" r="2" fill="#3b82f6" />
      </svg>
    </div>
  )
}

// IndexedDB helper functions
const DB_NAME = "DashboardDB"
const DB_VERSION = 1
const WALLPAPER_STORE = "wallpapers"

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains(WALLPAPER_STORE)) {
        const store = db.createObjectStore(WALLPAPER_STORE, { keyPath: "id" })
        store.createIndex("name", "name", { unique: false })
        store.createIndex("type", "type", { unique: false })
      }
    }
  })
}

const saveWallpaperToDB = async (wallpaper) => {
  const db = await openDB()
  const transaction = db.transaction([WALLPAPER_STORE], "readwrite")
  const store = transaction.objectStore(WALLPAPER_STORE)
  return store.add(wallpaper)
}

const getAllWallpapersFromDB = async () => {
  const db = await openDB()
  const transaction = db.transaction([WALLPAPER_STORE], "readonly")
  const store = transaction.objectStore(WALLPAPER_STORE)
  return new Promise((resolve, reject) => {
    const request = store.getAll()
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

const deleteWallpaperFromDB = async (id) => {
  const db = await openDB()
  const transaction = db.transaction([WALLPAPER_STORE], "readwrite")
  const store = transaction.objectStore(WALLPAPER_STORE)
  return store.delete(id)
}

// Main Dashboard Component
export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
   const [recentSearches, setRecentSearches] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [customSites, setCustomSites] = useState([])
  const [showAddSiteModal, setShowAddSiteModal] = useState(false)
  const [newSiteUrl, setNewSiteUrl] = useState("")
  const [newSiteName, setNewSiteName] = useState("")
  const [selectedSites, setSelectedSites] = useState([])
  const [isSelectionMode, setIsSelectionMode] = useState(false)
  const pressTimer = useRef(null)

  const [showWallpaperPanel, setShowWallpaperPanel] = useState(false)
  const [wallpapers, setWallpapers] = useState([])
  const [currentWallpaper, setCurrentWallpaper] = useState("")
  const [currentWallpaperType, setCurrentWallpaperType] = useState("image")
  const [autoSelectEnabled, setAutoSelectEnabled] = useState(true)
  const [enableAllTypes, setEnableAllTypes] = useState(true)
  const fileInputRef = useRef(null)

  const [watch, setWatch] = useState(false)
  const [weather, setWeather] = useState(false)
  const [temprature, setTemprature] = useState(false)
  const [weatherType, setWeatherType] = useState("SUNNY")
  let [switchEnableCount, setswitchEnableCount] = useState(1)
  // Function to set wallpaper
  const handleSetWallpaper = (wallpaper) => {
    setCurrentWallpaper(wallpaper.url)
    setCurrentWallpaperType(wallpaper.type)
  }


  // useEffect(()=>{
  //   getWeather()
  //   .then((res)=>{
  //     console.log(res.weather.main.humidity);
  //     setWeatherType(res.weather.weather[0].main)
  //   })
  // },[])

  // Load History
  useEffect(()=>{
    // history().then((res)=>{
    //   console.log(res);
      
    // })
    // .catch((err)=>{
    //   console.log(err);
      
    // })
  },[])



  // Load data from localStorage and IndexedDB
  useEffect(() => {
    const savedSites = localStorage.getItem("customSites")
    if (savedSites) {
      setCustomSites(JSON.parse(savedSites))
    }
    // const savedSearches = localStorage.getItem("recentSearches")
    // if (savedSearches) {
      
      let his = []
      history().then((res)=>{
      // console.log("res",res);
       setRecentSearches(res)
    })
    .catch((err)=>{
      console.log(err);
      
    })
    
      // setRecentSearches(JSON.parse(savedSearches))
    // }
    
    

    // Load wallpapers from IndexedDB
    const loadWallpapers = async () => {
      try {
        const wallpapersFromDB = await getAllWallpapersFromDB()
        // Create object URLs for display
        const wallpapersWithUrls = wallpapersFromDB.map((wallpaper) => ({
          ...wallpaper,
          url: URL.createObjectURL(wallpaper.blob),
        }))
        setWallpapers(wallpapersWithUrls)

        if (wallpapersWithUrls.length > 0) {
          const randomWallpaper = wallpapersWithUrls[Math.floor(Math.random() * wallpapersWithUrls.length)]
          setCurrentWallpaper(randomWallpaper.url)
          setCurrentWallpaperType(randomWallpaper.type)
        }
      } catch (error) {
        console.error("Error loading wallpapers from IndexedDB:", error)
      }
    }
    loadWallpapers()

    const savedAutoSelect = localStorage.getItem("autoSelectEnabled")
    if (savedAutoSelect) {
      setAutoSelectEnabled(JSON.parse(savedAutoSelect))
    }

    const savedEnableAllTypes = localStorage.getItem("enableAllTypes")
    if (savedEnableAllTypes) {
      setEnableAllTypes(JSON.parse(savedEnableAllTypes))
    }
    // switchEnableCount =1
    const savedEnableWatch = localStorage.getItem("watch")
    if (savedEnableWatch) {
      setWatch(JSON.parse(savedEnableWatch))
      // JSON.parse(savedEnableWatch) ? setswitchEnableCount(switchEnableCount += 1) : ""
      
    }
    const savedEnableWeather = localStorage.getItem("weather")
    if (savedEnableWeather) {
      setWeather(JSON.parse(savedEnableWeather))
      // JSON.parse(savedEnableWeather) ? setswitchEnableCount(switchEnableCount += 1) : ""
    }
    const savedEnableTemprature = localStorage.getItem("temprature")
    if (savedEnableTemprature) {
      setTemprature(JSON.parse(savedEnableTemprature))
      // JSON.parse(savedEnableTemprature) ? setswitchEnableCount(switchEnableCount += 1) : ""
    }
    // console.log(switchEnableCount);
    
  }, [])

  // Save data to localStorage (sites and settings only)
  useEffect(() => {
    localStorage.setItem("customSites", JSON.stringify(customSites))
  }, [customSites])

  useEffect(() => {
    localStorage.setItem("currentWallpaper", currentWallpaper)
  }, [currentWallpaper])

  useEffect(() => {
    localStorage.setItem("autoSelectEnabled", JSON.stringify(autoSelectEnabled))
  }, [autoSelectEnabled])

  useEffect(() => {
    localStorage.setItem("enableAllTypes", JSON.stringify(enableAllTypes))
  }, [enableAllTypes])

  useEffect(() => {
    localStorage.setItem("watch", JSON.stringify(watch))
    // console.log(watch);
    
    // console.log(switchEnableCount);
    watch==true ? switchEnableCount<3 ? setswitchEnableCount(switchEnableCount += 1) :"" : switchEnableCount>1 ? setswitchEnableCount(switchEnableCount -= 1) :""
    // console.log(switchEnableCount);
    
  }, [watch])
  
  useEffect(() => {
    localStorage.setItem("weather", JSON.stringify(weather))
    weather==true ? switchEnableCount<3 ? setswitchEnableCount(switchEnableCount += 1) :"" : switchEnableCount>0 ? setswitchEnableCount(switchEnableCount -= 1) :""
    // console.log(switchEnableCount);
  }, [weather])
  
  useEffect(() => {
    localStorage.setItem("temprature", JSON.stringify(temprature))
    temprature==true ? switchEnableCount<3 ? setswitchEnableCount(switchEnableCount += 1) :"" : switchEnableCount>0 ? setswitchEnableCount(switchEnableCount -= 1) :""
  }, [temprature])

  //   useEffect(() => {
  //   localStorage.setItem("recentSearches", JSON.stringify(recentSearches))
  // }, [recentSearches])

  // Auto wallpaper change
  useEffect(() => {
    if (autoSelectEnabled && wallpapers.length > 0) {
      const setRandomWallpaper = () => {
        const availableWallpapers = enableAllTypes
          ? wallpapers
          : wallpapers.filter((w) => w.type === currentWallpaperType)

        if (availableWallpapers.length > 0) {
          const randomWallpaper = availableWallpapers[Math.floor(Math.random() * availableWallpapers.length)]
          setCurrentWallpaper(randomWallpaper.url)
          setCurrentWallpaperType(randomWallpaper.type)
        }
      }

      // Set up interval for changing wallpaper every 10 seconds
      const interval = setInterval(setRandomWallpaper, 60000)

      return () => clearInterval(interval)
    }
  }, [autoSelectEnabled, wallpapers, enableAllTypes, currentWallpaperType])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const newSearch = searchQuery.trim()
      setRecentSearches((prev) => {
        const filtered = prev.filter((search) => search !== newSearch)
        return [newSearch, ...filtered].slice(0, 10) // Keep only 10 recent searches
      })
      const target = autoSelectEnabled ? "_blank" : "_self"
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, "_self")
      setShowSuggestions(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSearch()
  }
  const handleSearchInputChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    setShowSuggestions(value.length > 0)
  }

  const handleSearchInputFocus = () => {
    if (searchQuery.length > 0) {
      setShowSuggestions(true)
    }
  }

  const handleSearchInputBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => setShowSuggestions(false), 200)
  }

  const handleSuggestionClick = (suggestion) => {
    // console.log(suggestion);
    
    setSearchQuery(suggestion)
    setShowSuggestions(false)
    const target = autoSelectEnabled ? "_blank" : "_self"
    window.open(`${suggestion.url}`, target)
  }

  const filteredSuggestions = recentSearches.filter(
    (search) => (search.title).toLowerCase().includes(searchQuery.toLowerCase()) && search !== searchQuery,
  )
  // console.log(filteredSuggestions);
  

  const getFaviconUrl = (url) => {
    try {
      const domain = new URL(url).hostname
      if (domain.includes("whatsapp.com") || domain.includes("web.whatsapp.com")) {
        return "https://web.whatsapp.com/favicon.ico/"
      }
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
    } catch {
      return `https://www.google.com/s2/favicons?domain=${url}&sz=64`
    }
  }

  const handleAddSite = () => {
    if (newSiteUrl.trim() && newSiteName.trim()) {
      const newSite = {
        id: Date.now().toString(),
        name: newSiteName.trim(),
        url: newSiteUrl.trim().startsWith("http") ? newSiteUrl.trim() : `https://${newSiteUrl.trim()}`,
        favicon: getFaviconUrl(newSiteUrl.trim()),
      };

      // console.log( newSite );
      

      setCustomSites((prev) => [...prev, newSite])
      setNewSiteUrl("")
      setNewSiteName("")
      setShowAddSiteModal(false)
    }
  }

  const handleOpenSite = (url) => {
    const target = autoSelectEnabled ? "_blank" : "_self"
    window.open(url, target)
  }

  const handleMouseDown = (siteId) => {
    pressTimer.current = setTimeout(() => {
      setIsSelectionMode(true)
      setSelectedSites([siteId])
    }, 500)
  }

  const handleMouseUp = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current)
      pressTimer.current = null
    }
  }

  const handleSiteClick = (site) => {
    if (isSelectionMode) {
      setSelectedSites((prev) => (prev.includes(site.id) ? prev.filter((id) => id !== site.id) : [...prev, site.id]))
    } else {
      handleOpenSite(site.url)
    }
  }

  const handleDeleteSelected = () => {
    setCustomSites((prev) => prev.filter((site) => !selectedSites.includes(site.id)))
    setSelectedSites([])
    setIsSelectionMode(false)
  }

  const handleCancelSelection = () => {
    setSelectedSites([])
    setIsSelectionMode(false)
  }

  const handleFileUpload = async (event) => {
    const files = event.target.files
    if (!files) return

    for (const file of Array.from(files)) {
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        try {
          const wallpaperData = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            name: file.name,
            type: file.type.startsWith("image/") ? "image" : "video",
            blob: file,
            createdAt: new Date().toISOString(),
          }

          // Save to IndexedDB
          await saveWallpaperToDB(wallpaperData)

          // Add to state with object URL for display
          const wallpaperWithUrl = {
            ...wallpaperData,
            url: URL.createObjectURL(file),
          }
          setWallpapers((prev) => [...prev, wallpaperWithUrl])
        } catch (error) {
          console.error("Error saving wallpaper to IndexedDB:", error)
        }
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleRemoveWallpaper = async (id) => {
    try {
      // Find the wallpaper to revoke its object URL
      const wallpaperToRemove = wallpapers.find((w) => w.id === id)
      if (wallpaperToRemove && wallpaperToRemove.url) {
        URL.revokeObjectURL(wallpaperToRemove.url)
      }

      // Remove from IndexedDB
      await deleteWallpaperFromDB(id)

      // Update state
      setWallpapers((prev) => prev.filter((w) => w.id !== id))

      // Clear current wallpaper if it was the removed one
      if (currentWallpaper === wallpaperToRemove?.url) {
        setCurrentWallpaper("")
      }
    } catch (error) {
      console.error("Error removing wallpaper from IndexedDB:", error)
    }
  }

  // Cleanup object URLs when component unmounts
  useEffect(() => {
    return () => {
      wallpapers.forEach((wallpaper) => {
        if (wallpaper.url && wallpaper.url.startsWith("blob:")) {
          URL.revokeObjectURL(wallpaper.url)
        }
      })
    }
  }, [])

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-blue-600 p-1 relative overflow-hidden bg-center"
      style={{
        backgroundImage: currentWallpaperType === "image" && currentWallpaper ? `url(${currentWallpaper})` : undefined,
        backgroundSize: "cover",
        // backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Video Background */}
      {currentWallpaperType === "video" && currentWallpaper && (
        <video className="absolute inset-0 w-full h-full object-cover z-0" autoPlay loop muted playsInline>
          <source src={currentWallpaper} type="video/mp4" />
        </video>
      )}

      {/* Background Overlay */}
      {currentWallpaper && <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] z-[0]" />}

      {/* Wallpaper Panel Toggle Button */}
      <button
        onClick={() => setShowWallpaperPanel(!showWallpaperPanel)}
        className="fixed panel-button-glass left-0 top-1/2 transform -translate-y-1/2 z-40 bg-white/20 backdrop-blur-sm rounded-r-xl p-3 hover:bg-white/30 transition-all duration-300"
      >
        <div
          className={`w-6 h-6 flex items-center justify-center transform transition-transform duration-300 ${showWallpaperPanel ? "rotate-180" : ""
            }`}
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>

      {/* Wallpaper Panel */}
      <div
        className={`fixed glass left-0 top-0 h-full w-80 bg-white/10 backdrop-blur-md border-r border-white/20 transform transition-transform duration-300 z-30 ${showWallpaperPanel ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-6 h-full flex flex-col">
          <h2 className="input text-white text-xl font-semibold mb-6">Wallpapers</h2>

          {/* Switches */}
          <div className="mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">Slide Show</p>
                <p className="text-white/60 text-xs">Automatic Change Background after 1 min </p>
              </div>
              <button
                onClick={() => setAutoSelectEnabled(!autoSelectEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${autoSelectEnabled ? "bg-blue-500" : "bg-gray-600"
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${autoSelectEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                />
              </button>
            </div>

            {/* <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">All Types</p>
                <p className="text-white/60 text-xs">Random from all wallpapers</p>
              </div>
              <button
                onClick={() => setEnableAllTypes(!enableAllTypes)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  enableAllTypes ? "bg-blue-500" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    enableAllTypes ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div> */}
            {/* Watch  Button*/}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">Watch </p>
                <p className="text-white/60 text-xs">Random from all wallpapers</p>
              </div>
              <button
                onClick={() => setWatch(!watch)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${watch ? "bg-blue-500" : "bg-gray-600"
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${watch ? "translate-x-6" : "translate-x-1"
                    }`}
                />
              </button>
            </div>
            {/* Weather  Button*/}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">Wather </p>
                <p className="text-white/60 text-xs">Random from all wallpapers</p>
              </div>
              <button
                onClick={() => setWeather(!weather)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${weather ? "bg-blue-500" : "bg-gray-600"
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${weather ? "translate-x-6" : "translate-x-1"
                    }`}
                />
              </button>
            </div>
            {/* Temprature  Button*/}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">Wather </p>
                <p className="text-white/60 text-xs">Random from all wallpapers</p>
              </div>
              <button
                onClick={() => setTemprature(!temprature)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${temprature ? "bg-blue-500" : "bg-gray-600"
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${temprature ? "translate-x-6" : "translate-x-1"
                    }`}
                />
              </button>
            </div>
          </div>

          {/* Wallpaper Grid */}
          <div className="wallCursor flex-1 overflow-y-auto space-y-4 mb-6">
            {wallpapers.map((wallpaper) => (
              <div key={wallpaper.id} className="relative group">
                <div
                  className="w-full h-24 rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-white/50 transition-all bg-transparent"
                  onClick={() => handleSetWallpaper(wallpaper)}
                >
                  {wallpaper.type === "image" ? (
                    <img
                      src={wallpaper.url || "/placeholder.svg"}
                      alt={wallpaper.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={wallpaper.url}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => e.currentTarget.pause()}
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {currentWallpaper === wallpaper.url ? "Current" : "Set as Wallpaper"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveWallpaper(wallpaper.id)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            {wallpapers.length === 0 && (
              <div className="text-white/60 text-center py-8">No wallpapers uploaded yet</div>
            )}
          </div>

          {/* Panel Controls */}
          <div className="space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl py-3"
            >
              Upload Wallpaper
            </Button>

            {/* {currentWallpaper && (
              <Button
                onClick={() => setCurrentWallpaper("")}
                variant="outline"
                className="w-full border-white/30 text-white hover:bg-white/10 rounded-xl py-3 bg-transparent"
              >
                Remove Current Wallpaper
              </Button>
            )} */}

            {/* <Button
              variant="outline"
              className="w-full border-white/30 text-white hover:bg-white/10 rounded-xl py-3 bg-transparent"
            >
              Hide Shortcuts
            </Button> */}
          </div>

        </div>
      </div>

      {/* Panel Backdrop */}
      {showWallpaperPanel && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20" onClick={() => setShowWallpaperPanel(false)} />
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto pt-10 relative z-10">
        {/* Widget Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-1 ${switchEnableCount==2 ? "md:grid-cols-2": switchEnableCount==3 ? "md:grid-cols-3" : ""} place-items-center justify-center   gap-4 mb-1  `}>
          {/* Clock Widget */}

          {watch ? <div className="glass bg-white/20 max-w-4xl backdrop-blur-sm rounded-3xl p-2 px-10 flex flex-col items-center justify-center ">
            <div className="relative w-44 h-44 mb-1">
              <div className="w-full h-full bg-white/30 rounded-full flex items-center justify-center ">
                <AnalogClock />
              </div>
            </div>
            <div className="text-center">
              <h2 className="input text-gray-800 font-semibold text-lg">
                {new Date().toLocaleDateString("en-US", { weekday: "long" })} {/* Example: Wednesday */}
              </h2>
              <p className="input text-gray-600">
                {new Date().toLocaleDateString("en-US", {
                  month: "short", // "Jan"
                  day: "numeric", // "8"  
                })}
              </p>
            </div>
          </div> : ""}

          {/* <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 flex flex-col items-center justify-center">
            <div className="relative w-24 h-24 mb-4">
              <div className="w-full h-full bg-white/30 rounded-full flex items-center justify-center">
                <AnalogClock />
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-gray-800 font-semibold text-lg">Tech Enthusiast</h2>
              <p className="text-gray-600">Wed, Jan 8</p>
            </div>
          </div> */}

          {/* Weather Widget */}
          {
            weather ?
              <div className="glass bg-white/20 backdrop-blur-sm rounded-3xl p-6 px-10">
                <div className="text-center mb-4">
                  <h3 className="text-gray-800 font-semibold text-lg">{weatherType}</h3>
                </div>

                <div className="space-y-3">
                  <div className="bg-blue-500 rounded-full px-4 py-2 flex items-center justify-between">
                    <span className="text-white font-medium">Humidity 93%</span>
                    <Droplets className="w-5 h-5 text-white" />
                  </div>

                  <div className="bg-white/30 rounded-full px-4 py-2 flex items-center">
                    <Droplets className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-gray-700 text-sm">Feels -0.8°C</span>
                  </div>

                  <div className="bg-blue-500 rounded-full px-4 py-2 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white mr-2" />
                    <span className="text-white font-medium">London</span>
                  </div>
                </div>
              </div> : ""
          }

          {/* Temperature Widget */}
          {temprature ?

            <div className="glass bg-white/20 backdrop-blur-sm rounded-3xl p-6 flex flex-col items-center justify-center px-10">
              <div className="text-6xl font-light text-gray-800 mb-2">1°C</div>
              <Sun className="w-12 h-12 text-yellow-500" />
            </div> : ""
          }
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-8">
        <form
          onSubmit={handleSubmit}
          className="glass bg-white/20 backdrop-blur-sm rounded-full p-1 pr-2 flex items-center gap-2 mb-1 transform translate-y-20"
        >
          <SearchIcon className="w-15 h-15 text-gray-600 ml-4" />
          <Input
            value={searchQuery}
            onChange={handleSearchInputChange}
              onFocus={handleSearchInputFocus}
              onBlur={handleSearchInputBlur}
            // onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type here..."
            className="input flex-1 text-white border-0 bg-transparent placeholder:text-gray-600 focus-visible:ring-0"
          />
          <Mic className="w-15 h-15 text-gray-600" />
          <Button
            type="submit"
            onClick={handleSearch}
            className="input bg-blue-500/50 hover:bg-blue-600 text-white rounded-l-full rounded-r-full px-6"
          >
            Search
          </Button>
        </form>
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute top-40 left-0 right-0 mt-2 bg-white/0 rounded-2xl   border border-white/0 z-[60] overflow-hidden">
              {filteredSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className=" px-4 py-3 bg-amber-50/80 h-15 hover:bg-amber-50/90 cursor-pointer text-gray-800 font-medium  transition-colors mb-3 rounded-2xl overflow-hidden"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="flex  items-start flex-row gap-1 w-full h-full justify-between ">
                    <SearchIcon className="w-7 h-7 text-black" />
                    <span className="suggestionCursor w-8/10 h-full text-xl text-black flex justify-center-safe items-start overflow-y-scroll">{suggestion.title}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Quote Widget */}
        {/* <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-16 max-w-2xl mx-auto">
          <div className="flex justify-between items-center">
            <p className="text-gray-700">Too many requests. Obtain an auth key for unlimited access.</p>
            <span className="text-gray-600 text-sm">zenquotes.io</span>
          </div>
        </div> */}
      </div>

      {/* Bottom Dock */}
      <div className="fixed bottom-80 left-1/2 transform -translate-x-1/2">
        <div className="glass bg-black/20 backdrop-blur-sm rounded-2xl p-3 flex items-center gap-7">
          {/* Default App Icons */}
          {/* <div
            className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors"
            onClick={() => window.open("https://youtube.com", "_blank")}
          >
            <span className="text-white font-bold">YT</span>
          </div>
          <div
            className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
            onClick={() => window.open("https://gmail.com", "_blank")}
          >
            <span className="text-white font-bold">@</span>
          </div> */}
          {/* <div
            className="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors"
            onClick={() => window.open("https://telegram.org", "_blank")}
          >
            <span className="text-white font-bold">T</span>
          </div>
          <div
            className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center cursor-pointer hover:bg-green-600 transition-colors"
            onClick={() => window.open("https://whatsapp.com", "_blank")}
          >
            <span className="text-white font-bold">📞</span>
          </div>
          <div
            className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors"
            onClick={() => window.open("https://reddit.com", "_blank")}
          >
            <span className="text-white font-bold">R</span>
          </div> */}
          {/* <div
            className="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors"
            onClick={() => window.open("https://twitter.com", "_blank")}
          >
            <span className="text-white font-bold">🐦</span>
          </div>
          <div
            className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors"
            onClick={() => window.open("https://github.com", "_blank")}
          >
            <span className="text-white font-bold">GH</span>
          </div>
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
            <span className="text-white font-bold">◉</span>
          </div> */}

          {/* Custom Sites */}
          {customSites.map((site) => (
            <div key={site.id} className="relative group">
              <div
                className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center cursor-pointer transition-all ${selectedSites.includes(site.id) ? "ring-2 ring-blue-500 bg-blue-100" : "hover:bg-gray-100"
                  } ${isSelectionMode ? "animate-pulse" : ""}`}
                onMouseDown={() => handleMouseDown(site.id)}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={() => handleMouseDown(site.id)}
                onTouchEnd={handleMouseUp}
                onClick={() => handleSiteClick(site)}
                title={site.name}
              >
                <img
                  src={site.favicon || "/placeholder.svg"}
                  alt={site.name}
                  className="w-8 h-8 rounded"
                  onError={(e) => {
                    const target = e.target
                    const domain = new URL(site.url).hostname
                    const faviconUrl = `https://${domain}/favicon.ico`

                    if (target.src !== faviconUrl) {
                      target.src = faviconUrl
                    } else {
                      target.style.display = "none"
                      const textSpan = target.nextElementSibling
                      if (textSpan) {
                        textSpan.textContent = site.name.charAt(0).toUpperCase()
                        textSpan.classList.remove("hidden")
                      }
                    }
                  }}
                />
                <span className="text-gray-800 font-bold text-sm hidden"></span>
                {selectedSites.includes(site.id) && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {site.name}
              </div>
            </div>
          ))}

          {/* Add Site Button */}
          {!isSelectionMode && (
            <div
              className="w-12 h-12 bg-gray-600 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-500 transition-colors"
              onClick={() => setShowAddSiteModal(true)}
            >
              <span className="text-white font-bold text-xl">+</span>
            </div>
          )}
        </div>
      </div>

      {/* Selection Mode Controls */}
      {isSelectionMode && selectedSites.length > 0 && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2">
          <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-3 flex items-center gap-3">
            <Button
              onClick={handleCancelSelection}
              variant="outline"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              Cancel
            </Button>
            <Button onClick={handleDeleteSelected} className="bg-red-500 hover:bg-red-600 text-white">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete ({selectedSites.length})
            </Button>
          </div>
        </div>
      )}

      {/* Add Site Modal */}
      {showAddSiteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Add New Site</h3>
              <button onClick={() => setShowAddSiteModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                <Input
                  value={newSiteName}
                  onChange={(e) => setNewSiteName(e.target.value)}
                  placeholder="e.g., Facebook, Netflix"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                <Input
                  value={newSiteUrl}
                  onChange={(e) => setNewSiteUrl(e.target.value)}
                  placeholder="e.g., facebook.com, netflix.com"
                  className="w-full"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={() => setShowAddSiteModal(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={handleAddSite}
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                  disabled={!newSiteName.trim() || !newSiteUrl.trim()}
                >
                  Add Site
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
