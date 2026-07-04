import React from 'react'

export default function Welcome({ onStart }) {
  return (
    <div className="screen center enter">
      <div className="thread" />
      <div className="brand">GUEST<b>IQ</b></div>
      <h1 className="serif-h hero">You see things about our guests<br/>that no system does.</h1>
      <p className="lede">
        A quiet place to get it down &mdash; one guest at a time, in your own words.
        Stop and come back whenever.
      </p>
      <button className="cta" onClick={onStart}>Let&rsquo;s get it down &rarr;</button>
    </div>
  )
}
