"use client"
import React from 'react'
import ImageFallback from "../../layouts/helpers/ImageFallback";

interface MyProps {
    imageList
    priority
    alt
    width
    height
  }

  interface MyState {
    currentImageIndex
  }

class RandomImage extends React.Component<MyProps, MyState> {
    changeImage = () => {
        const randomNumber = Math.floor(Math.random() * this.props.imageList.length);
        return randomNumber
    }
    render() {
        return (
        <ImageFallback
            src={this.props.imageList[this.changeImage()].src}
            blurDataURL={this.props.imageList[this.changeImage()].blurDataURL}
            priority={this.props.priority}
            placeholder="blur"
            alt={this.props.alt}
            width={500}
            height={300}
        />
        )
    }
    } 

  export default RandomImage;
  