import React from 'react'
import { Link } from 'react-router-dom'

function About() {
    return (
        <div>
            <div className="text-3xl mt-10">
                Elevate Your Well-being in the Digital Age of Healthcare
            </div>
            <div className="px-16 text-start mt-8">
                <p>
                    Being healthy and fit in simple terms means taking good care of the body. We should remember that a healthy mind resides only in a healthy body. Good health of both mind and body helps one maintain the required energy level to achieve success in life. All of us must strive to achieve wholesome health.
                    Protecting your body from the intake of harmful substances, doing regular exercises, having proper food and sleep are some of the important instances that define a healthy lifestyle. Aldo being fit allows us to perform our activities without being lethargic, restless or tired.
                    A healthy and fit person is capable of living the life to the fullest, without any major medical or physical issues. Being healthy is not only related to the physical well-being of a person, it also involves the mental stability or the internal peace of a person.
                    Generally, a healthy diet consists of taking a proper and healthy food which includes eating green and fresh vegetables, fruits, having milk, eggs, minerals, proteins and vitamins essential for a human’s lifestyle. Practicing Yoga including regular exercises in your daily routine also help you maintain your desired fitness, blood sugar and immunity level.
                    Healthy habits improve your physical appearance, mental stability, ability to perform activities in a better way, which help you lead a stress-free lifestyle, maintaining happy moods, high energy levels, etc. Each individual should take of one’s health on a priority; no single day should be skipped for making efforts on maintaining physical and mental fitness. Being happy is directly related to boosting your mental strength and health, so happiness can be considered as the result as well as the part of a healthy and fit lifestyle.
                    Conclusion: Health is the most important thing that a person should take care of. Leading a healthy lifestyle leads to happiness, success and achievements.
                </p>
            </div>
            <div className='mt-8'>
                <Link to='/'>
                    <button className='bg-[#2D6A76] rounded-md px-10 py-1 text-white font-inder' >Start Journey</button>
                </Link>
            </div>
        </div>
    )
}

export default About
