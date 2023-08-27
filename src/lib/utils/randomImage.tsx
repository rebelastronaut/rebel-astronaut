"use client"
import React from 'react'
import ImageFallback from "../../layouts/helpers/ImageFallback";

interface MyProps {
    imageList
    width
    height
    priority
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
            width={this.props.width}
            height={this.props.height}
            priority={this.props.priority}
            placeholder="blur"
        />
        )
    }
    } 

  export default RandomImage;
  