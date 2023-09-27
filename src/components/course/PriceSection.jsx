import React from 'react'

const PriceSection = ({ detail }) => {
  // console.log('PriceSection detail', detail)
  // __typename: 'CoursePriceSectionRecord',
  // id: '202115287',
  // title: 'Get The Course',
  // priceCards: [
  //   {
  //     id: '202115322',
  //     title: 'Get Just This Course',
  //     description: '* Get this course for life\n' +
  //       '* Use the code in your own projects\n' +
  //       '* Access our Discord for support',
  //     finePrint: '',
  //     featured: false,
  //     isFree: true,
  //     buttonText: 'Get For Free',
  //     priceInCents: '',
  //     priceSuffix: ''
  //   },
  //   {
  //     id: '202115323',
  //     title: 'GET ALL COURSES',
  //     description: '* Become a Better Pro Dev\n' +
  //       '* Get this course for life\n' +
  //       '* Use the code in your own projects\n' +
  //       '* Access our Discord for support',
  //     finePrint: 'Cancel at any time',
  //     featured: true,
  //     isFree: false,
  //     buttonText: 'Go Pro for 12$/mo',
  //     priceInCents: '1200',
  //     priceSuffix: '/mo'
  //   }
  // ]

  return (
    <section id={detail?.__typename}>
      <div className=''>PriceSection</div>
    </section>
  )
}

export default PriceSection
