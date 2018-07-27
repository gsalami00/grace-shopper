import React from 'react'

const RenderField = field => (
  <div>
    <label>{field.label}</label>
    <input {...field.input} />
    {field.touched &&
      field.error && <div className="error">{field.error}</div>}
  </div>
)

export default RenderField
