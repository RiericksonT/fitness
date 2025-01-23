"use client";

import { useState, useEffect } from "react";
import Slider from "react-slick";

export default function WeeklyCarousel() {
  interface DayData {
    date: string;
    weekday: string;
    diet: boolean;
    hydration: boolean;
    exercise: boolean;
  }

  const [weeklyData, setWeeklyData] = useState<DayData[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar os dados do banco com base na data
  const fetchWeeklyData = async () => {
    try {
      const response = await fetch(`/api/getWeek`);
      const data = await response.json();
      setWeeklyData(data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeeklyData();
  }, []);

  // Configuração do carrossel
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  if (loading) return <p className="text-gray-500">Carregando...</p>;

  if (!weeklyData.length) return <p className="text-gray-500">Sem dados</p>;
  return (
    <div className="max-w-md mx-auto bg-gradient-[#d9cbb8] rounded-lg p-6">
      <Slider {...settings}>
        {weeklyData.map((day, index) => (
          <div
            key={index}
            className="p-6 bg-white/30 backdrop-blur-lg shadow-xl rounded-md shadow-md"
          >
            <h2 className="text-center text-xl text-[#8b6f58] mb-4">
              {day.date.split("T")[0]}
            </h2>

            <div className="flex justify-around items-center">
              {day.hydration && (
                <div className="flex flex-col items-center">
                  <span className="text-4xl text-blue-500">💧</span>
                  <span className="mt-2 text-lg font-medium text-[#8b6f58]">
                    Água
                  </span>
                </div>
              )}

              {day.diet && (
                <div className="flex flex-col items-center">
                  <span className="text-4xl text-green-500">🍎</span>
                  <span className="mt-2 text-lg font-medium text-[#8b6f58]">
                    Comida
                  </span>
                </div>
              )}

              {day.exercise && (
                <div className="flex flex-col items-center">
                  <span className="text-4xl text-red-500">🏋️</span>
                  <span className="mt-2 text-lg font-medium text-[#8b6f58]">
                    Exercício
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
