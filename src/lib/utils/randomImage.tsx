"use client"
import React from 'react'
import ImageFallback from "../../layouts/helpers/ImageFallback";

interface MyProps {
    imageList
    width
    height
  }

  interface MyState {
    currentImageIndex
  }

class RandomImage extends React.Component<MyProps, MyState> {
    changeImage = () => {
        console.log(this.props.imageList)
        const randomNumber = Math.floor(Math.random() * this.props.imageList.length);
        const randomKey = this.props.imageList[randomNumber]
        console.log(randomKey)
        console.log(this.props.imageList.randomKey)
        return randomNumber
    }
    render() {
        return (
        <ImageFallback
            src={this.props.imageList[this.changeImage()].src}
            blurDataURL={this.props.imageList[this.changeImage()].blurDataURL}
            width={this.props.width}
            height={this.props.height}
            placeholder="blur"
        />
        )
    }
    } 

  export default RandomImage;
  