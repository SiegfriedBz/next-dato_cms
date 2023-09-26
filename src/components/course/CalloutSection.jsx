const CalloutSection = ({ detail }) => {
  console.log('CalloutSection detail', detail)
  // __typename: 'CourseCalloutSectionRecord',
  // id: '202036926',
  // smallTitle: '',
  // bigTitle: '',
  // description: 'Simplify your CSS workflow with Tailwind CSS. Discover a utility-first framework that streamlines styling and empowers you to design beautiful, responsive websites with ease'

  return (
    <section id={detail?.__typename}>
      <div className=''>CalloutSection</div>
    </section>
  )
}

export default CalloutSection
