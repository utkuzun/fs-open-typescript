import React from 'react'

import { CoursePart } from '../customTypes'
import Part from './Part'

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  if (courseParts.length <= 0) {
    return null
  }

  return (
    <div>
      {courseParts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  )
}

export default Content
