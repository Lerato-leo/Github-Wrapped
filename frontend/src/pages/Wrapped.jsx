import { useState } from 'react'
import '../styles/Wrapped.css'
import Slide from '../components/Slide'
import IntroSlide from '../components/slides/IntroSlide'
import TotalCommitsSlide from '../components/slides/TotalCommitsSlide'
import BiggestDaySlide from '../components/slides/BiggestDaySlide'
import CodingTimeHabitSlide from '../components/slides/CodingTimeHabitSlide'
import MostActiveDaySlide from '../components/slides/MostActiveDaySlide'
import TopLanguagesSlide from '../components/slides/TopLanguagesSlide'
import TopRepositorySlide from '../components/slides/TopRepositorySlide'
import PersonalitySlide from '../components/slides/PersonalitySlide'
import LongestInactiveSlide from '../components/slides/LongestInactiveSlide'
import YearSummarySlide from '../components/slides/YearSummarySlide'
import YearComparisonSlide from '../components/slides/YearComparisonSlide'
import ShareCardSlide from '../components/slides/ShareCardSlide'

export default function Wrapped({ data, onReset }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    { component: IntroSlide, props: { data: data.slides.intro } },
    { component: TotalCommitsSlide, props: { data: data.slides.totalCommits } },
    { component: BiggestDaySlide, props: { data: data.slides.biggestDay } },
    { component: CodingTimeHabitSlide, props: { data: data.slides.codingTimeHabit } },
    { component: MostActiveDaySlide, props: { data: data.slides.mostActiveDay } },
    { component: TopLanguagesSlide, props: { data: data.slides.topLanguages } },
    { component: TopRepositorySlide, props: { data: data.slides.topRepository } },
    { component: PersonalitySlide, props: { data: data.slides.personality } },
    { component: LongestInactiveSlide, props: { data: data.slides.longestInactive } },
    { component: YearSummarySlide, props: { data: data.slides.yearSummary } },
  ]

  // Add year comparison if available
  if (data.slides.yearComparison) {
    slides.push({ 
      component: YearComparisonSlide, 
      props: { data: data.slides.yearComparison } 
    })
  }

  slides.push({ 
    component: ShareCardSlide, 
    props: { data: data.slides.shareCard, wrappedData: data } 
  })

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const handleScroll = (e) => {
    if (e.deltaY > 0) {
      handleNext()
    } else if (e.deltaY < 0) {
      handlePrev()
    }
  }

  const SlideComponent = slides[currentSlide].component
  const slideProps = slides[currentSlide].props

  return (
    <div className="wrapped" onWheel={handleScroll}>
      <div className="wrapped-container">
        <SlideComponent {...slideProps} />
      </div>

      <div className="slide-controls">
        <button 
          className="slide-button prev-button"
          onClick={handlePrev}
          disabled={currentSlide === 0}
          aria-label="Previous slide"
        >
          ←
        </button>

        <div className="slide-counter">
          {currentSlide + 1} / {slides.length}
        </div>

        <button 
          className="slide-button next-button"
          onClick={handleNext}
          disabled={currentSlide === slides.length - 1}
          aria-label="Next slide"
        >
          →
        </button>
      </div>

      <button className="reset-button" onClick={onReset}>
        Generate Another
      </button>
    </div>
  )
}
