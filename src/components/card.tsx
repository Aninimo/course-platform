interface CardProps{
  number: number;
  description: string;
}

export function Card({ number, description }: CardProps){
  return(
    <div className='bg-gray-200 rounded p-2'>
      <div className='flex items-center gap-4'>
       <strong className='font-bold text-2xl'>
         {number}
       </strong>
       {description}
      </div>
    </div>
  )
}
