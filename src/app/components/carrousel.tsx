"use client";

import { useState, useEffect } from "react";
import { Slider } from "react-slick";

export default function WeeklyCarousel() {
  interface DayData {
    date: string;
    weekday: string;
    water: boolean;
    food: boolean;
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
    <div className="max-w-md mx-auto bg-transparent">
      <Slider {...settings}>
        {weeklyData.map((day, index) => (
          <div key={index} className="p-6 bg-transparent rounded-md">
            <h2 className="text-center text-xl font-semibold text-[#b19b88] mb-4">
              {day.date} - {day.weekday}
            </h2>

            <label className="flex items-center border-b border-white pb-2">
              <input
                type="checkbox"
                checked={day.water}
                readOnly
                className="w-5 h-5 appearance-none border border-white rounded-full checked:bg-blue-500 checked:border-blue-500"
              />
              <span className="ml-3 text-lg font-medium text-white">Água</span>
            </label>

            <label className="flex items-center border-b border-white pb-2">
              <input
                type="checkbox"
                checked={day.food}
                readOnly
                className="w-5 h-5 appearance-none border border-white rounded-full checked:bg-green-500 checked:border-green-500"
              />
              <span className="ml-3 text-lg font-medium text-white">
                Comida
              </span>
            </label>

            <label className="flex items-center border-b border-white pb-2">
              <input
                type="checkbox"
                checked={day.exercise}
                readOnly
                className="w-5 h-5 appearance-none border border-white rounded-full checked:bg-red-500 checked:border-red-500"
              />
              <span className="ml-3 text-lg font-medium text-white">
                Exercício
              </span>
            </label>
          </div>
        ))}
      </Slider>
    </div>
  );
}
