const HeaderSection = ({ detail }) => {
  console.log('HeaderSection detail', detail)

  const sentences = detail.description.split('.')

  return (
    <section id={detail?.__typename}>
      <div className='flex w-full flex-col items-center justify-between bg-gray-200 py-24'>
        <h2 className='text-3xl font-bold capitalize'>{detail.smallTitle}</h2>
        <h1 className='mb-3 text-7xl font-extrabold'>{detail.bigTitle}</h1>
        {sentences.map((sentence, index) => {
          return (
            <p key={index} className='w-1/3 text-center'>
              {sentence}
            </p>
          )
        })}
        <a
          href='#CoursePriceSectionRecord'
          className='mt-5 rounded-3xl border-2 bg-amber-400 px-8 py-4 text-2xl font-extrabold text-stone-100 transition duration-500 ease-in-out hover:border-stone-100 hover:bg-amber-500'
        >
          {detail.buttonText}
        </a>
      </div>
    </section>
  )
}

export default HeaderSection
