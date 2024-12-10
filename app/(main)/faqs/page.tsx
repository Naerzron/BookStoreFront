"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

const faqsData = [
  {
    question: "¿Qué métodos de pago aceptan?",
    answer: "Aceptamos tarjetas de crédito, PayPal, transferencias bancarias y pagos contra entrega.",
  },
  {
    question: "¿Cuál es el tiempo de envío?",
    answer: "El tiempo de envío es de 3 a 5 días hábiles para envíos nacionales y de 7 a 15 días para envíos internacionales.",
  },
  {
    question: "¿Puedo devolver un producto?",
    answer: "Sí, aceptamos devoluciones dentro de los primeros 30 días desde la fecha de recepción, siempre y cuando el producto esté en su estado original.",
  },
  {
    question: "¿Cómo puedo contactar con atención al cliente?",
    answer: "Puedes contactarnos por correo electrónico a soporte@ejemplo.com o llamando al 123-456-7890.",
  },
  {
    question: "¿Ofrecen garantía en sus productos?",
    answer: "Sí, todos nuestros productos tienen una garantía de 1 año por defectos de fabricación.",
  },
];

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-8 px-12 pt-32 pb-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white text-center">
        Preguntas Frecuentes
      </h1>
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-4xl grid grid-cols-1 gap-6"
      >
        {faqsData.map((faq, index) => (
          <AccordionItem
            value={`item-${index}`}
            className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800"
          >
            <AccordionTrigger className="px-4 py-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600">
              <button
                className="w-full text-left flex justify-between items-center"
              >
                <span className="font-medium text-gray-800 dark:text-white">
                  {faq.question}
                </span>
              </button>
            </AccordionTrigger>
            <AccordionContent className="px-4 py-4 bg-white dark:bg-gray-900">
              <p className="text-gray-700 dark:text-gray-400">
                {faq.answer}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
