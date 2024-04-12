import React from 'react'
import About from './About'

const Inotebook = () => {
  return (
    <div>
      <div className="row">
        <div className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1 aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
          <h1>iNotebook - Safe and Secured Notes</h1>
          <h2>The perfect place to store your important notes and ideas</h2>
          {/* <div className="d-flex justify-content-center justify-content-lg-start">
            <a href="/assets/apk/iNotebook.apk" className="btn-get-started scrollto" style={{backgroundColor:"#f1735b"}}>Download Now</a>
            <a href="https://github.com/ashish-tiwary13/iNotebook-app" className="btn-watch-video"><i className="bi bi-github"></i><span>Github</span></a>
          </div> */}
        </div>
        <div className="col-lg-6 order-1 order-lg-2 hero-img d-flex justify-content-center aos-init aos-animate" data-aos="zoom-in" data-aos-delay="200">
          <img src="https://i-notebook-app-website-download.vercel.app/assets/img/hero-img.png" className="img-fluid animated" style={{maxWidth: "45%"}} alt=""/>
        </div>
      </div>
      <About/>
    </div>
  )
}

export default Inotebook
