import React from 'react'

import { CoursePart, assertNever } from '../customTypes'

const Part = ({ part }: { part: CoursePart }) => {
  const { name, exerciseCount } = part
  let description
  let groupProjectCount
  let exerciseSubmissionLink
  let requirements

  if (part.type === 'normal') {
    description = part.description
  } else if (part.type === 'groupProject') {
    groupProjectCount = part.groupProjectCount
  } else if (part.type === 'submission') {
    exerciseSubmissionLink = part.exerciseSubmissionLink
  } else if (part.type === 'special') {
    requirements = part.requirements
  } else {
    assertNever(part)
  }

  return (
    <div>
      <h4>
        {name} {exerciseCount}
      </h4>
      {description && <p>{description}</p>}
      {groupProjectCount && <p>project exercies {groupProjectCount}</p>}
      {exerciseSubmissionLink && <p>submit to {exerciseSubmissionLink}</p>}
      {requirements && (
        <p>
          required skills :
          {requirements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </p>
      )}
    </div>
  )
}

export default Part
