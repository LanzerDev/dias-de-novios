import { useState, useEffect } from 'react';
import { Heart, Calendar, Clock, Users } from 'lucide-react';

const LoveCounter = () => {
  const [startDate, setStartDate] = useState('2023-11-25');
  const [isEditable, setIsEditable] = useState(false);
  const [timeData, setTimeData] = useState({});

  // Función para calcular diferencias de tiempo
  const calculateTimeDifference = (start: string) => {
    const startDateTime = new Date(start);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - startDateTime.getTime());
    
    const seconds = Math.floor(diffTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44); // Promedio de días por mes
    const years = Math.floor(days / 365.25); // Considerando años bisiestos
    
    // Calcular años, meses y días exactos
    const yearsDiff = now.getFullYear() - startDateTime.getFullYear();
    const monthsDiff = now.getMonth() - startDateTime.getMonth();
    const daysDiff = now.getDate() - startDateTime.getDate();
    
    let exactYears = yearsDiff;
    let exactMonths = monthsDiff;
    let exactDays = daysDiff;
    
    if (exactDays < 0) {
      exactMonths--;
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      exactDays += lastMonth.getDate();
    }
    
    if (exactMonths < 0) {
      exactYears--;
      exactMonths += 12;
    }
    
    return {
      totalDays: days,
      totalWeeks: weeks,
      totalMonths: months,
      totalYears: years,
      totalHours: hours,
      totalMinutes: minutes,
      totalSeconds: seconds,
      exactYears,
      exactMonths,
      exactDays
    };
  };

  useEffect(() => {
    const updateTime = () => {
      setTimeData(calculateTimeDifference(startDate));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, [startDate]);

  // Componente de corazón flotante
  const FloatingHeart = ({ delay, duration, size = 20 }) => (
    <div
      className="absolute opacity-20 pointer-events-none"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      <Heart
        size={size}
        className="text-pink-400 animate-bounce"
        fill="currentColor"
        style={{
          animation: `float ${duration}s ease-in-out infinite ${delay}s, fadeInOut ${duration}s ease-in-out infinite ${delay}s`
        }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-red-100 relative overflow-hidden">
      {/* Corazones flotantes */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <FloatingHeart
            key={i}
            delay={i * 2}
            duration={8 + Math.random() * 4}
            size={15 + Math.random() * 10}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10%, 90% {
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.6;
          }
        }
        
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.4; }
        }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }
        
        .animate-slideIn {
          animation: slideIn 0.6s ease-out forwards;
        }
      `}</style>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-slideIn">
          <div className="flex justify-center items-center mb-4">
            <Heart className="text-red-500 mr-2 animate-heartbeat" size={32} fill="currentColor" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Nuestro Amor en Números
            </h1>
            <Heart className="text-red-500 ml-2 animate-heartbeat" size={32} fill="currentColor" />
          </div>
          <p className="text-gray-600 text-lg">Cada segundo cuenta cuando estás enamorado</p>
        </div>

        {/* Date Input */}
        <div className="max-w-md mx-auto mb-8 animate-slideIn" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-pink-200">
            <label className="block text-gray-700 text-sm font-medium mb-2 flex items-center">
              <Calendar className="mr-2 text-pink-500" size={20} />
              Fecha de inicio de nuestro amor
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              disabled={!isEditable}
              className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/80 disabled:bg-gray-50 disabled:cursor-not-allowed text-center font-medium"
            />
            <button
              onClick={() => setIsEditable(!isEditable)}
              className="text-gray-400 text-sm mt-3 hover:text-pink-500 transition-colors duration-200 opacity-60"
            >
              ¿Quieres calcular otra fecha?
            </button>
          </div>
        </div>

        {/* Main Counter Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Exact Time Card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-pink-200 animate-slideIn" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <Users className="mx-auto text-pink-500 mb-4" size={32} />
              <h3 className="text-xl font-bold text-gray-800 mb-4">Tiempo Exacto Juntos</h3>
              <div className="text-4xl md:text-5xl font-bold text-pink-600 mb-2">
                {timeData.exactYears > 0 && (
                  <span>{timeData.exactYears} año{timeData.exactYears !== 1 ? 's' : ''}</span>
                )}
              </div>
              <div className="text-2xl md:text-3xl font-semibold text-pink-500">
                {timeData.exactMonths > 0 && (
                  <span>{timeData.exactMonths} mes{timeData.exactMonths !== 1 ? 'es' : ''} </span>
                )}
                {timeData.exactDays} día{timeData.exactDays !== 1 ? 's' : ''}
              </div>
            </div>
          </div>

          {/* Total Days Card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-pink-200 animate-slideIn" style={{ animationDelay: '0.5s' }}>
            <div className="text-center">
              <Heart className="mx-auto text-red-500 mb-4 animate-heartbeat" size={32} fill="currentColor" />
              <h3 className="text-xl font-bold text-gray-800 mb-4">Días Totales</h3>
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
                {timeData.totalDays?.toLocaleString()}
              </div>
              <div className="text-gray-600">días de amor puro</div>
            </div>
          </div>
        </div>

        {/* Detailed Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Semanas', value: timeData.totalWeeks, icon: Calendar, color: 'purple' },
            { label: 'Meses', value: timeData.totalMonths, icon: Calendar, color: 'blue' },
            { label: 'Horas', value: timeData.totalHours, icon: Clock, color: 'green' },
            { label: 'Minutos', value: timeData.totalMinutes, icon: Clock, color: 'yellow' },
            { label: 'Segundos', value: timeData.totalSeconds, icon: Clock, color: 'indigo' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-pink-200 animate-slideIn"
              style={{ animationDelay: `${0.6 + index * 0.1}s` }}
            >
              <div className="text-center">
                <stat.icon className={`mx-auto text-${stat.color}-500 mb-2`} size={24} />
                <div className={`text-2xl md:text-3xl font-bold text-${stat.color}-600 mb-1`}>
                  {stat.value?.toLocaleString()}
                </div>
                <div className="text-xs text-gray-600 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Love Quote */}
        <div className="max-w-2xl mx-auto text-center mb-8 animate-slideIn" style={{ animationDelay: '1.2s' }}>
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-pink-200">
            <p className="text-lg md:text-xl text-gray-700 italic font-medium leading-relaxed">
              "Desde que te conocí comencé a vivir, y esta es la edad de nuestro amor"
            </p>
          </div>
        </div>

        {/* Dedication */}
        <div className="text-center animate-slideIn" style={{ animationDelay: '1.4s' }}>
          <div className="inline-flex items-center bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-4 rounded-full shadow-xl transform hover:scale-105 transition-transform duration-300">
            <Heart className="mr-2 animate-heartbeat" size={20} fill="currentColor" />
            <span className="text-lg font-bold">Para mi querida Lucy</span>
            <Heart className="ml-2 animate-heartbeat" size={20} fill="currentColor" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoveCounter;