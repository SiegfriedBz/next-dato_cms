const LearnSection = ({ detail }) => {
  // console.log('LearnSection detail', detail)
  // __typename: 'CourseLearnSectionRecord',
  // id: '202115286',
  // title: 'What you ll learn',
  // numberOfLessons: '24',
  // hoursOfContent: '12.5',
  // learningPoint: []

  return (
    <section id={detail?.__typename}>
      <div className=''>
        LearnSection
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </section>
  )
}

export default LearnSection
