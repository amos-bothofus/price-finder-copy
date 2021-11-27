import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import parseHtml from 'html-react-parser'


const useStyles = makeStyles((theme) => {
    return {
        optionImage: {
            height: "auto",
            [theme.breakpoints.down("sm")]: {
                width: "100px",
                height: "auto",
            },
        },
        heading: {
            fontSize: 25,
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: '1.2',
            letterSpacing: 'normal',
            textAlign: 'center',
            color: '#ff6011',
            [theme.breakpoints.down("sm")]: {
                fontSize: '20px',
            },
        }
    };
});

const AnswerImage = ({width, src, alt, heading}) => {
    const classes = useStyles(useStyles)

    return (
        <div align={'center'}>
            <img height={'auto'} width={width} src={src} alt={alt}/>
           {(heading.toLowerCase() === 'ios' || heading.toLowerCase() === 'android') && parseHtml('<br>')}
            <p className={classes.heading}>{parseHtml(heading)}</p>
        </div>
    );
};

export default AnswerImage;
