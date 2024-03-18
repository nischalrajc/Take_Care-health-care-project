import React from 'react'
import NavBar from '../../Components/User/NavBAr'
import Footer from '../../Components/User/Footer'

function TipsPage() {
    return (
        <div>
            <NavBar />

            <div className="mt-10 text-xs sm:text-base mx-6 sm:mx-20 text-start text-black">
                At this extreme moment, we began working from home, away from campus, and keeping social distance for as many people as possible. As we stay home and are stuck with the foods that have been in our fridge or pantry for a while, we are temporarily living a sedentary lifestyle with increased odds of physical inactivity, excessive eating and sitting, stress, anxiety, and depression. In particular, many of us will gain some weight during the pandemic and may keep the extra weight permanently, which may carry considerable health risks for type 2 diabetes, hypertension, heart attack, stroke, and other health problems.
            </div>

            <div className="w-3/5 lg:w-2/6 sm:w-2/4 w mx-auto mt-8">
                <div className=' mx-2 sm:h-64 h-48' style={{ overflow: 'hidden' }} >
                    <img className="w-full h-full object-cover" src='/healthtips.jpg' alt="doctors" />
                </div>
            </div>

            <div className="mt-10 text-xs sm:text-base mx-6 sm:mx-20 text-start text-black">
                Here, I’d like to share some basic tips and resources for how to maintain your healthy lifestyle, body weight, and overall well-being while staying home and engaging in social distancing.
            </div>

            <div className="mt-2 text-xs sm:text-sm md:text-base sm:mt-8 grid sm:grid-cols-2 px-6 sm:px-20 gap-2 sm:gap-10">
                <div className="bg-[#95B4E0] rounded-md p-3 text-start">
                    <p>Eating balanced nutritional diet also directly benefits one’s lifestyle. Having appropriate diet does not lead to fat; it leads to a healthy self. Eating fruits and vegetables help people to maintain adequate levels of calorie, reduce the risk of disease, maintain the balance of essential minerals and vitamins, etc.</p>
                </div>

                <div className="bg-[#95B4E0] rounded-md p-3 text-start">
                    <p>Yoga is another activity that lays great emphasis on both mental and physical wellbeing of humans. Yoga is an effective method for improving health and acts as a preventive measure against diseases. It reduces stress, anxiety, depression, etc which are the core natural and mental factors that disturb health.</p>
                </div>
            </div>

            <div className="mt-2 text-xs sm:text-sm md:text-base sm:mt-8 grid sm:grid-cols-2 px-6 sm:px-20 gap-2 sm:gap-10">
                <div className="bg-[#95B4E0] rounded-md p-3 text-start">
                    <p>Regular exercise is essential for health, aiding weight control, boosting the immune system, and increasing energy levels. Incorporate it into your routine by walking or cycling short distances, using stairs, and walking during calls to stay active even with a busy schedule.</p>
                </div>
                <div className="bg-[#95B4E0] rounded-md p-3 text-start">
                    <p>Hygiene and sanitation are also major factors that affect the health of a person. Sitting at a place that is not properly clean can instantly make a person unwell and lead to various diseases. Good personal hygiene is one of the most effective ways to protect ourselves and others from many illnesses.</p>
                </div>
            </div>


            <Footer />

        </div>
    )
}

export default TipsPage
