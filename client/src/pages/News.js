import React, { useEffect, useState } from 'react'
import { Box, Button, Tabs, Tab, useTheme, AppBar } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'
import './style.css'
import NewsList from '../components/NewsList'
import { useDispatch, useSelector } from 'react-redux'
import { addstate } from '../redux/news/actions'
function TabPanel(props) {
    const { value, index, ...other } = props
    return <Box role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other} sx={{ p: 3 }}></Box>
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    }
}

export default function News() {
    const [state, setState] = useState(false)
    const dispatch = useDispatch() //로그인 리듀서
    const [newsRecord, setNewsRecord] = useState()
    const { news } = useSelector((state) => state)

    Promise.all([news.recordfind]).then((values) => {
        setNewsRecord(values[0])
        setState(true)
    })

    //top tab
    const theme = useTheme()
    const [value, setValue] = React.useState(0)
    const tabHandleChange = (event, newValue) => {
        setValue(newValue)
    }
    const handleChangeIndex = (index) => {
        setValue(index)
    }

    return (
        <Box className="News">
            {state == false ? (
                <div />
            ) : (
                <Box>
                    <AppBar position="static" color="primary" style={{ backgroundColor: '#ede7f6' }}>
                        <Tabs
                            value={value}
                            onChange={tabHandleChange}
                            style={{ color: '#5E2F78', backgroundColor: '#ffff' }}
                            indicatorColor="primary"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            <Tab label="전체 뉴스" {...a11yProps(0)} style={{ fontWeight: 600 }} />
                            <Tab label="NAVER" {...a11yProps(1)} style={{ fontWeight: 600 }} />
                            <Tab label="Google" {...a11yProps(2)} style={{ fontWeight: 600 }} />
                            <Tab label="Bing" {...a11yProps(3)} style={{ fontWeight: 600 }} />
                            <Tab label="The Guardian" {...a11yProps(4)} style={{ fontWeight: 600 }} />
                            <Tab label="kakao" {...a11yProps(5)} style={{ fontWeight: 600 }} />
                        </Tabs>
                        <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
                            <TabPanel value={value} index={0} dir={theme.direction}>
                                <NewsList props={'NAVER'} newsRecord={newsRecord} />
                                <NewsList props={'Google'} newsRecord={newsRecord} />
                                <NewsList props={'Bing'} newsRecord={newsRecord} />
                                <NewsList props={'The Guardian'} newsRecord={newsRecord} />
                                <NewsList props={'kakao'} newsRecord={newsRecord} />
                            </TabPanel>
                            <TabPanel value={value} index={1} dir={theme.direction}>
                                <NewsList props={'NAVER'} newsRecord={newsRecord} />
                            </TabPanel>
                            <TabPanel value={value} index={2} dir={theme.direction}>
                                <NewsList props={'Google'} newsRecord={newsRecord} />
                            </TabPanel>
                            <TabPanel value={value} index={3} dir={theme.direction}>
                                <NewsList props={'Bing'} newsRecord={newsRecord} />
                            </TabPanel>
                            <TabPanel value={value} index={4} dir={theme.direction}>
                                <NewsList props={'The Guardian'} newsRecord={newsRecord} />
                            </TabPanel>
                            <TabPanel value={value} index={5} dir={theme.direction}>
                                <NewsList props={'kakao'} newsRecord={newsRecord} />
                            </TabPanel>
                        </SwipeableViews>
                    </AppBar>
                </Box>
            )}
        </Box>
    )
}
