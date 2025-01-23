"use client";

import { useState } from "react";

export default function ChecklistForm({ userEmail }: { userEmail: string }) {
  // Estado para armazenar os valores dos checkboxes
  const [formData, setFormData] = useState({
    water: false,
    food: false,
    exercise: false,
    userEmail: userEmail,
  });

  // Manipular mudanças no checkbox
  const handleChange = (e: { target: { id: string; checked: boolean } }) => {
    const { id, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: checked,
    }));
  };

  // Função para enviar os dados ao backend
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/save-checklist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Dados salvos com sucesso!");
      } else {
        alert("Erro ao salvar os dados.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao enviar os dados.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-md mx-auto bg-transparent rounded-md space-y-6"
    >
      <label className="flex items-center border-b border-white pb-2">
        <input
          type="checkbox"
          id="water"
          checked={formData.water}
          onChange={handleChange}
          className="w-5 h-5 accent-blue-500 appearance-none border border-[#b19b88] rounded-full checked:bg-blue-400 checked:border-blue-500"
        />
        <span className="ml-3 text-lg font-medium text-[#b19b88]">Água</span>
      </label>

      <label className="flex items-center border-b border-white pb-2">
        <input
          type="checkbox"
          id="food"
          checked={formData.food}
          onChange={handleChange}
          className="w-5 h-5 accent-green-500 appearance-none border border-[#b19b88] rounded-full checked:bg-green-400 checked:border-green-500"
        />
        <span className="ml-3 text-lg font-medium text-[#b19b88]">Comida</span>
      </label>

      <label className="flex items-center border-b border-white pb-2">
        <input
          type="checkbox"
          id="exercise"
          checked={formData.exercise}
          onChange={handleChange}
          className="w-5 h-5 accent-red-500 appearance-none border border-[#b19b88] rounded-full checked:bg-red-400 checked:border-red-500"
        />
        <span className="ml-3 text-lg font-medium text-[#b19b88]">
          Exercício
        </span>
      </label>

      <button
        type="submit"
        className="w-full border border-[#b19b88] text-[#b19b88] py-2 rounded-md hover:bg-transparent border-black hover:text-black transition duration-300"
      >
        Salvar
      </button>
    </form>
  );
}
