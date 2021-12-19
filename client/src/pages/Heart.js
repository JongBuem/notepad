import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import { useDispatch, useSelector } from 'react-redux'
import LinkIcon from '@material-ui/icons/Link'
import { Link } from '@material-ui/core'
import bingImg from '../img/a.png'
const columns = [
    { id: 'title', label: '공급자', minWidth: 170, align: 'center' },
    { id: 'code', label: '제목', minWidth: 100, align: 'center' },
    {
        id: 'population',
        label: '내용',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: '날짜',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: '링크',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
]

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100%',
        textAlign: 'center',
    },
    container: {
        maxHeight: '84%',
    },
})

export default function StickyHeadTable() {
    const classes = useStyles()
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const { news } = useSelector((state) => state)
    const [state, setState] = React.useState(false)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    function createData(title, code, population, size, density) {
        return { title, code, population, size, density }
    }

    const row = []

    const [rows, setRows] = React.useState(row)

    Promise.all([news.recordfind]).then(async (values) => {
        if (!state) {
            let arry = values[0]
            await arry.map((item, index) => {
                let provider = item.provider

                if (provider == 'NAVER') {
                    provider = 'http://wiki.hash.kr/images/c/cf/%EB%84%A4%EC%9D%B4%EB%B2%84%E3%88%9C_%EB%A1%9C%EA%B3%A0.png'
                } else if (provider == 'kakao') {
                    provider = 'http://wiki.hash.kr/images/7/7f/%E3%88%9C%EC%B9%B4%EC%B9%B4%EC%98%A4_%EB%A1%9C%EA%B3%A0.png'
                } else if (provider == 'Google') {
                    provider = 'http://wiki.hash.kr/images/e/e4/%EA%B5%AC%EA%B8%80_%EB%A1%9C%EA%B3%A0.png'
                } else if (provider == 'The Guardian') {
                    provider = 'http://wiki.hash.kr/images/9/9e/%EB%8D%94_%EA%B0%80%EB%94%94%EC%96%B8_%EB%A1%9C%EA%B3%A0.png'
                } else if (provider == 'Bing') {
                    provider = bingImg
                }
                row.unshift(createData(provider, item.title, item.info, item.date, item.url))
            })
            setRows(row)
            setState(true)
        }
    })

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, color: '#5E2F78', fontWeight: 1000 }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column, index) => {
                                        const value = row[column.id]
                                        if (index == 0) {
                                            return (
                                                <TableCell key={index} style={{ backgroundColor: '#ffff', textAlign: 'center', fontWeight: 600, fontFamily: 'Fjalla One' }}>
                                                    <img src={value} style={{ width: 35 }} />
                                                </TableCell>
                                            )
                                        } else if (index % 2 == 1) {
                                            return (
                                                <TableCell key={index} style={{ backgroundColor: '#EDE7F6', textAlign: 'center', fontWeight: 600, fontFamily: 'Fjalla One' }}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            )
                                        } else if (index == 4) {
                                            return (
                                                <TableCell key={index} style={{ backgroundColor: '#ffff', textAlign: 'center', fontWeight: 600, fontFamily: 'Fjalla One' }}>
                                                    {column.format && typeof value === 'number' ? (
                                                        <Link href={column.format(value)}>
                                                            <LinkIcon style={{ fontSize: 30 }} />
                                                        </Link>
                                                    ) : (
                                                        <Link href={value}>
                                                            <LinkIcon style={{ fontSize: 30 }} />
                                                        </Link>
                                                    )}
                                                </TableCell>
                                            )
                                        } else {
                                            return (
                                                <TableCell key={index} style={{ backgroundColor: '#ffff', textAlign: 'center', fontFamily: 'Fjalla One' }}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            )
                                        }
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{ borderTop: '0.1px solid #D9D9D9' }}
            />
        </Paper>
    )
}
