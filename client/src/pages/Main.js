import React from 'react'
// react component for creating beautiful carousel
import Carousel from 'react-slick'
// material-ui components
// @material-ui/icons
import LocationOn from '@material-ui/icons/LocationOn'
import { Card, Grid } from '@material-ui/core'
import image1 from '../img/a.png'
import image2 from '../img/no.png'
import image3 from '../img/bing.png'
import './main.scss'

export default function Main() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        autoplayHoverPause: true,
    }
    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <Card style={{ backgroundColor: '#EDE7F6' }}>
                    <Carousel {...settings}>
                        <div className="one">
                            {/* <div><img src={image1} alt="First slide" className="slick-image" /></div> */}

                            <div className="content_1">
                                <div className="content">
                                    <p style={{ fontFamily: 'Fjalla One' }}>
                                        News Moa는 <br />
                                        <b style={{ lineHeight: '10px' }}></b> <br />
                                        <span style={{ fontSize: '50px' }}>뉴스를 제공 합니다.</span>
                                    </p>
                                    <div className="buttons">
                                        <a href="#">더 알아보기</a>
                                    </div>
                                </div>
                                <table style={{ width: '50%' }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ backgroundColor: '#EDE7F6', boxShadow: 'none' }}></td>
                                            <td style={{ backgroundColor: '#5E2F78' }}>
                                                <i className="fas fa-cloud" style={{ color: '#FFFF' }}></i>
                                            </td>
                                            <td style={{ backgroundColor: '#EDE7F6' }}></td>
                                        </tr>
                                        <tr>
                                            <td style={{ backgroundColor: '#5E2F78' }}>
                                                <i className="fas fa-database" style={{ color: '#FFFF' }}></i>

                                                <div className="blocks_2"></div>
                                            </td>
                                            <td style={{ backgroundColor: '#5E2F78' }}>
                                                <div className="blockstop"></div>
                                                <div className="blocksrigth"></div>
                                                <div className="blocksleft"></div>
                                                <i class="far fa-newspaper" style={{ color: '#FFFF' }}></i>
                                            </td>
                                            <td style={{ backgroundColor: '#5E2F78' }}>
                                                <i className="fab fa-bitcoin" style={{ color: '#FFFF' }}></i>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ backgroundColor: '#5E2F78' }}>
                                                <i className="fas fa-sitemap" style={{ color: '#FFFF' }}></i>
                                            </td>
                                            <td style={{ backgroundColor: '#EDE7F6' }}></td>
                                            <td style={{ backgroundColor: '#EDE7F6', boxShadow: 'none' }}></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Carousel>
                </Card>
            </Grid>
        </Grid>
    )
}
