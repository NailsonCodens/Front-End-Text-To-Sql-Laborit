'use client'

import { api } from "@/lib/api";
import { SetStateAction, useState } from "react";
import DynamicTable from "./component/Dinamyc";

type ResultProps = {
  sql: string;
  result: any[]; // Certifique-se de que result seja um array
};

export default function Home() {
  const [question, setQuestion] = useState<string>('');
  const [checkResult, setCheckResult] = useState<boolean>(false)
  const [result, setResult] = useState<ResultProps>({ sql: '', result: [] })
  const [loading, setLoading] = useState<boolean>(false)
  const [warning, setWarning] = useState<boolean>(false)
  const [showResult, setShowResult] = useState<boolean>(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleCheckResult = () => {
    setCheckResult(!checkResult)
  }

  const handleGetResult = async () => {
    setLoading(true);
    try {
      const response = await api.post('/ask', {
        question: question,
        result: checkResult,
      });
      if(response.data.response){
        setResult(response.data.response);     
      }

      if(checkResult){
        setShowResult(true)
      }

      if(!checkResult){
        setShowResult(false)
      }
            
      setLoading(false)
      setWarning(false);

    } catch (error) {
      setLoading(false);
      setWarning(true);
      setShowResult(false);
      setResult({} as ResultProps) 

    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 sm:p-12 md:p-24">
      <div className="container mx-auto max-w-full md:max-w-[1200px] px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">TextToSql FintechX</h2>
          <p className="text-base sm:text-lg text-gray-medium mt-4 text-center">Digite uma pergunta sobre os indicadores do seu negócio.</p>
          <div className="flex items-center mt-4 w-[100%]">
            <input
              type="text"
              className="flex-grow h-[40px] px-4 border border-gray-400 rounded"
              placeholder="Digite sua pergunta aqui"
              value={question}
              onChange={handleChange}
            />
            <button onClick={handleGetResult} className="ml-4 bg-blue-500 text-white px-6 py-2 rounded h-[40px]">
              Obter resultado
            </button>
          </div>  
          <div className="flex items-center mt-4">
            <p className="mr-2">Exibir resultado do SQL gerado?</p>
            <input
              type="checkbox"
              checked={checkResult}
              onChange={handleCheckResult}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
          </div>
          
          <div className="flex w-full sm:w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1200px] mx-auto mt-10 mb-10">
            <div className="flex-1 h-4 bg-[#CD6261]"></div>
            <div className="flex-1 h-4 bg-[#3B7FD2]"></div>
            <div className="flex-1 h-4 bg-[#E89F49]"></div>
            <div className="flex-1 h-4 bg-[#439465]"></div>
          </div>

          <h2 className="mt-4 text-center text-2xl sm:text-3xl md:text-42l font-bold">Resultado gerado pelo SQL</h2>
          <pre className="bg-gray-100 text-gray-800 p-4 rounded border border-gray-300 overflow-x-auto mt-4 w-full mb-10">
            {loading ? 'Gerando código SQL' : result.sql || 'Seu código SQL vai aparecer aqui'}
          </pre>          
          {!loading && showResult && result.result && result.result.length > 0 && <DynamicTable data={result.result} />}
          {warning ? 'Não conseguimos gerar o resultado' : null }
        </div>
      </div>
    </main>
  );
}
