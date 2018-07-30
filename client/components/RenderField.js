import React from 'react'

const RenderField = field => (
  <div className="edit-profile-set-fields">
    <label className="edit-profile-label">{field.label}</label>
    <input className="edit-profile-input" {...field.input} />
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
)

export default RenderField
