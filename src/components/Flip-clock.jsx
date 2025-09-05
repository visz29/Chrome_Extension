"use client"
import { useState, useEffect, useRef, useContext, createContext, useCallback } from "react"
const cn = (...classes) => classes.filter(Boolean).join(" ")

const SelectContext = createContext(null)

function Select({ value, onValueChange, disabled, children }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const contentRef = useRef(null)

  const close = useCallback(() => setOpen(false), [])
  const setValue = useCallback(
    (v) => {
      if (typeof onValueChange === "function") onValueChange(v)
      close()
    },
    [onValueChange, close],
  )

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e) => {
      const root = rootRef.current
      const content = contentRef.current
      if (!root) return
      if (root.contains(e.target)) return // click inside select
      if (content && content.contains(e.target)) return
      setOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside, { passive: true })
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative inline-block w-full">
      <SelectContext.Provider value={{ open, setOpen, disabled, value, setValue, contentRef }}>
        {children}
      </SelectContext.Provider>
    </div>
  )
}

const SelectTrigger = ({ children, className = "", ...props }) => {
  const ctx = useContext(SelectContext) || {}
  const { open, setOpen, disabled } = ctx
  return (
    <button
      type="button"
      aria-haspopup="listbox"
      aria-expanded={!!open}
      disabled={disabled}
      onClick={() => !disabled && setOpen && setOpen((o) => !o)}
      className={cn(
        // h-12 for larger touch target; consumer can override via className
        "flex h-12 w-full items-center justify-between rounded-md border px-3 py-2 text-sm text-white bg-gray-700/60 border-white/20 backdrop-blur-md",
        className,
      )}
      {...props}
    >
      {children}
      <span className="ml-2 opacity-70">▾</span>
    </button>
  )
}

const SelectValue = ({ placeholder = "Select...", className = "" }) => {
  const ctx = useContext(SelectContext) || {}
  return <span className={className}>{ctx?.value ?? placeholder}</span>
}

const SelectContent = ({ children, className = "" }) => {
  const ctx = useContext(SelectContext) || {}
  const { open, contentRef } = ctx
  if (!open) return null
  return (
    <div
      ref={contentRef}
      role="listbox"
      className={cn(
        "absolute z-50 mt-2 max-h-48 w-full overflow-auto rounded-md border bg-gray-700 text-white shadow-lg border-gray-600",
        className,
      )}
    >
      {children}
    </div>
  )
}

const SelectItem = ({ value, children, className = "" }) => {
  const ctx = useContext(SelectContext) || {}
  const { setValue } = ctx
  return (
    <div
      role="option"
      tabIndex={0}
      onClick={() => setValue && setValue(value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          setValue && setValue(value)
        }
      }}
      className={cn("cursor-pointer select-none px-3 py-2 hover:bg-gray-600", className)}
    >
      {children}
    </div>
  )
}

const Card = ({ className = "", ...props }) => (
  <div
    className={cn("rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-xl", className)}
    {...props}
  />
)

const Button = ({ variant = "default", className = "", ...props }) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-0 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2"
  const variants = {
    default: "bg-white/10 text-white hover:bg-white/20 border border-white/20",
    outline: "bg-transparent text-gray-200 border border-gray-600 hover:bg-gray-700/40",
    ghost: "bg-transparent text-gray-300 hover:bg-white/10",
  }
  return <button className={cn(base, variants[variant] || variants.default, className)} {...props} />
}

function FlipDigit({ digit, isAnimating = false }) {
  return (
    <div className="relative w-8 h-14 md:w-10 md:h-18">
      <Card className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl">
        {/* Static digit display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl md:text-5xl font-bold text-white font-mono">{digit}</div>
        </div>

        {/* Center line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/30 transform -translate-y-px z-10 shadow-md" />

        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20 rounded-lg" />
      </Card>

      {isAnimating && <div className="absolute inset-0 bg-white/20 animate-pulse rounded-lg" />}
    </div>
  )
}

export function FlipClock() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [timerMode, setTimerMode] = useState("clock")
  const [timerDuration, setTimerDuration] = useState(0) // in seconds
  const [timerRemaining, setTimerRemaining] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [hasTimerStarted, setHasTimerStarted] = useState(false)
  const [timerMinutes, setTimerMinutes] = useState("05")
  const [timerSeconds, setTimerSeconds] = useState("00")

  const [customTime, setCustomTime] = useState(null)
  const [isCustomMode, setIsCustomMode] = useState(false)
  const [selectedHour, setSelectedHour] = useState("12")
  const [selectedMinute, setSelectedMinute] = useState("00")
  const [selectedPeriod, setSelectedPeriod] = useState("PM")

  const [showTimerPopup, setShowTimerPopup] = useState(false)

  const [showAlarmPopup, setShowAlarmPopup] = useState(false)
  const [alarmTime, setAlarmTime] = useState(null)
  const [alarmHour, setAlarmHour] = useState("12")
  const [alarmMinute, setAlarmMinute] = useState("00")
  const [alarmPeriod, setAlarmPeriod] = useState("PM")
  const [isAlarmActive, setIsAlarmActive] = useState(false)
  const [isAlarmRinging, setIsAlarmRinging] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerMode === "clock" && !isCustomMode) {
        setCurrentTime(new Date())

        if (alarmTime && isAlarmActive && !isAlarmRinging) {
          const now = new Date()
          const alarmHours = alarmTime.getHours()
          const alarmMinutes = alarmTime.getMinutes()

          if (now.getHours() === alarmHours && now.getMinutes() === alarmMinutes && now.getSeconds() === 0) {
            setIsAlarmRinging(true)
            // Play alarm sound or show notification
            // alert("Alarm! Time's up!")
          }
        }
      } else if (timerMode === "timer" && isTimerRunning && timerRemaining > 0) {
        setTimerRemaining((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false)
            return 0
          }
          return prev - 1
        })
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [timerMode, isCustomMode, isTimerRunning, timerRemaining, alarmTime, isAlarmActive, isAlarmRinging])

  const handleTimerModeClick = () => {
    setTimerMode("timer")
    setShowTimerPopup(true)
  }

  const startTimer = () => {
    const totalSeconds = Number.parseInt(timerMinutes) * 60 + Number.parseInt(timerSeconds)
    setTimerDuration(totalSeconds)
    setTimerRemaining(totalSeconds)
    setIsTimerRunning(true)
    setHasTimerStarted(true)
    setShowTimerPopup(false) // Close popup when timer starts
  }

  const pauseTimer = () => {
    setIsTimerRunning(false)
  }

  const resetTimer = () => {
    setIsTimerRunning(false)
    setTimerRemaining(timerDuration)
    setHasTimerStarted(false)
  }

  const stopTimer = () => {
    setIsTimerRunning(false)
    setTimerRemaining(0)
    setHasTimerStarted(false)
  }

  const getDisplayTime = () => {
    if (timerMode === "timer") {
      const minutes = Math.floor(timerRemaining / 60)
      const seconds = timerRemaining % 60
      return {
        hours: Math.floor(minutes / 60)
          .toString()
          .padStart(2, "0"),
        minutes: (minutes % 60).toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
        isPM: false,
        showSeconds: true,
      }
    } else {
      const displayTime = customTime || currentTime
      const hours = displayTime.getHours()
      const minutes = displayTime.getMinutes()
      const seconds = displayTime.getSeconds()
      const isPM = hours >= 12

      const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
      return {
        hours: displayHours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
        isPM,
        showSeconds: true,
      }
    }
  }

  const timeDisplay = getDisplayTime()

  const handleTimeChange = () => {
    const hour24 =
      selectedPeriod === "PM" && selectedHour !== "12"
        ? Number.parseInt(selectedHour) + 12
        : selectedPeriod === "AM" && selectedHour === "12"
          ? 0
          : Number.parseInt(selectedHour)

    const newTime = new Date()
    newTime.setHours(hour24, Number.parseInt(selectedMinute), 0, 0)
    setCustomTime(newTime)
    setIsCustomMode(true)
  }

  const resetToCurrentTime = () => {
    setCustomTime(null)
    setIsCustomMode(false)
  }

  // Generate hour options (1-12)
  const hourOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString())

  // Generate minute options (00-59)
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"))
  const timerMinuteOptions = Array.from({ length: 61 }, (_, i) => (i).toString().padStart(2, "0"))

  const setAlarm = () => {
    const hour24 =
      alarmPeriod === "PM" && alarmHour !== "12"
        ? Number.parseInt(alarmHour) + 12
        : alarmPeriod === "AM" && alarmHour === "12"
          ? 0
          : Number.parseInt(alarmHour)

    const newAlarmTime = new Date()
    newAlarmTime.setHours(hour24, Number.parseInt(alarmMinute), 0, 0)

    // If alarm time is in the past, set it for tomorrow
    if (newAlarmTime <= new Date()) {
      newAlarmTime.setDate(newAlarmTime.getDate() + 1)
    }

    setAlarmTime(newAlarmTime)
    setIsAlarmActive(true)
    setShowAlarmPopup(false)
  }

  const cancelAlarm = () => {
    setAlarmTime(null)
    setIsAlarmActive(false)
    setIsAlarmRinging(false)
  }

  const stopAlarmRinging = () => {
    setIsAlarmRinging(false)
  }

  return (
    <div className="flex flex-col items-center space-y-8 mt-0">
      <div
        className={`flex flex-col items-center space-y-4 p-4 bg-white/0 backdrop-blur-xs border border-white/10 rounded-3xl shadow-2xl ${showTimerPopup || showAlarmPopup ? "blur-sm" : ""}`}
      >
        <div className="flex space-x-2">
          <Button
            onClick={() => setTimerMode("clock")}
            variant={timerMode === "clock" ? "default" : "outline"}
            className={
              timerMode === "clock"
                ? "bg-blue-600 hover:bg-blue-700"
                : "border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
            }
          >
            Clock
          </Button>
          <Button
            onClick={handleTimerModeClick}
            variant={timerMode === "timer" ? "default" : "outline"}
            className={
              timerMode === "timer"
                ? "bg-blue-600 hover:bg-blue-700"
                : "border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
            }
          >
            Timer
          </Button>
          <Button
            onClick={() => setShowAlarmPopup(true)}
            variant="outline"
            className={
              isAlarmActive
                ? "border-orange-600 text-orange-300 hover:bg-gray-700 bg-transparent"
                : "border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
            }
          >
            Alarm
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <FlipDigit digit={timeDisplay.hours[0]} />
            <FlipDigit digit={timeDisplay.hours[1]} />
          </div>

          <div className="flex flex-col space-y-2 px-2">
            <div className="w-2 h-2 bg-white rounded-full" />
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>

          <div className="flex space-x-1">
            <FlipDigit digit={timeDisplay.minutes[0]} />
            <FlipDigit digit={timeDisplay.minutes[1]} />
          </div>

          {timeDisplay.showSeconds && (
            <>
              <div className="flex flex-col space-y-2 px-2">
                <div className="w-2 h-2 bg-white rounded-full" />
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>

              <div className="flex space-x-1">
                <FlipDigit digit={timeDisplay.seconds[0]} />
                <FlipDigit digit={timeDisplay.seconds[1]} />
              </div>
            </>
          )}
        </div>

        <div className="text-white text-xl font-semibold">
          {timerMode === "timer" ? (
            <span
               className={`${
                !hasTimerStarted
                  ? "text-blue-400"
                  : timerRemaining === 0
                    ? "text-red-500"
                    : isTimerRunning
                      ? "text-green-500"
                      : "text-yellow-500"
              }`}
            >
              {!hasTimerStarted ? "READY" : timerRemaining === 0 ? "TIME UP!" : isTimerRunning ? "RUNNING" : "PAUSED"}  
            </span>
          ) : timeDisplay.isPM ? (
            "PM"
          ) : (
            "AM"
          )}
        </div>

        {isAlarmActive && alarmTime && (
          <div className={`text-sm ${isAlarmRinging ? "text-red-400 animate-pulse" : "text-orange-400"}`}>
            {isAlarmRinging
              ? <>ALARM RINGING! <audio className="" src="alarm.mp3" autoPlay loop /></>
              : `Alarm set for ${alarmTime.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true })}`}
          </div>
        )}

        {timerMode === "clock" && isCustomMode && (
          <div className="text-gray-400 text-sm">Custom time mode - Clock is paused</div>
        )}
        {timerMode === "timer" && hasTimerStarted && timerRemaining === 0 && (
          <div className="text-red-400 text-sm animate-pulse">Timer finished!<audio className="" src="time_up_alarm.mp3" autoPlay loop/></div>
        )}
      </div>

      {showTimerPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 max-w-md w-full mx-4 shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white text-lg font-semibold">Timer Settings</h3>
                <Button
                  onClick={() => setShowTimerPopup(false)}
                  variant="ghost"
                  className="text-gray-400 hover:text-white p-1"
                >
                  ✕
                </Button>
              </div>

              <div className="flex items-center justify-center space-x-3">
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Minutes</label>
                  <Select value={timerMinutes} onValueChange={setTimerMinutes} disabled={isTimerRunning}>
                    <SelectTrigger className="w-20 bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600 max-h-40">
                      {timerMinuteOptions.map((minute) => (
                        <SelectItem key={minute} value={minute} className="text-white hover:bg-gray-600">
                          {minute}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="text-white text-xl pt-6">:</div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Seconds</label>
                  <Select value={timerSeconds} onValueChange={setTimerSeconds} disabled={isTimerRunning}>
                    <SelectTrigger className="w-20 bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600 max-h-40">
                      {minuteOptions.map((second) => (
                        <SelectItem key={second} value={second} className="text-white hover:bg-gray-600">
                          {second}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                {!isTimerRunning ? (
                  <Button onClick={startTimer} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                    Start
                  </Button>
                ) : (
                  <Button onClick={pauseTimer} className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white">
                    Pause
                  </Button>
                )}
                <Button
                  onClick={resetTimer}
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                >
                  Reset
                </Button>
                <Button
                  onClick={stopTimer}
                  variant="outline"
                  className="flex-1 border-red-600 text-red-300 hover:bg-gray-700 bg-transparent"
                >
                  Stop
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {showAlarmPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 max-w-md w-full mx-4 shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white text-lg font-semibold">Set Alarm</h3>
                <Button
                  onClick={() => setShowAlarmPopup(false)}
                  variant="ghost"
                  className="text-gray-400 hover:text-white p-1"
                >
                  ✕
                </Button>
              </div>

              <div className="flex items-center justify-center space-x-3">
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Hour</label>
                  <Select value={alarmHour} onValueChange={setAlarmHour}>
                    <SelectTrigger className="w-20 bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600 max-h-40">
                      {hourOptions.map((hour) => (
                        <SelectItem key={hour} value={hour} className="text-white hover:bg-gray-600">
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="text-white text-xl pt-6">:</div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Minute</label>
                  <Select value={alarmMinute} onValueChange={setAlarmMinute}>
                    <SelectTrigger className="w-20 bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-gray-700 border-gray-600">
                      {minuteOptions.map((minute) => (
                        <SelectItem key={minute} value={minute} className="text-white hover:bg-gray-600">
                          {minute}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Period</label>
                  <Select value={alarmPeriod} onValueChange={setAlarmPeriod}>
                    <SelectTrigger className="w-20 bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="AM" className="text-white hover:bg-gray-600">
                        AM
                      </SelectItem>
                      <SelectItem value="PM" className="text-white hover:bg-gray-600">
                        PM
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button onClick={setAlarm} className="flex-1 bg-orange-600 hover:bg-orange-700 text-white">
                  Set Alarm
                </Button>
                {isAlarmActive && (
                  <Button
                    onClick={cancelAlarm}
                    variant="outline"
                    className="flex-1 border-red-600 text-red-300 hover:bg-gray-700 bg-transparent"
                  >
                    Cancel Alarm
                  </Button>
                )}
                {isAlarmRinging && (
                  <Button onClick={stopAlarmRinging} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                    Stop Ringing
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
