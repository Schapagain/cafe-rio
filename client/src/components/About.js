import React from 'react'

export default function About({ className }) {
    return (
        <div className={`${className} m-auto lg:text-xl p-5 text-center rounded-xl bg-theme-color`}>
            <p>I know the menu looks delicious, but unfortunately this cafeteria does not really exist.</p>
            <p>The website started out with a hackathon, and we continued to add pieces here and there while we learnt new technogies.</p>
            <p>However, if you do have a cafeteria, and would like to use something like this, please let us know!</p>
        </div>
    )
}
