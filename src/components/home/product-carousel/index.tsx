import * as React from "react"
import { Card, CardContent } from "../../UI/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../UI/carousel"

export function ProductCarousel({ products }) {
  return (
    <Carousel
      opts={{ align: "start" }}
    >
      <CarouselContent>
        {products.map((product, index) => (
            <CarouselItem 
              key={index} 
              className="pl-4 md:basis-1/2 lg:basis-1/3"
            >
            <div className="p-1 h-full">
              <Card className="border-0 shadow-none rounded-none h-full">
                <CardContent className="p-0 h-full">
                  {/* Properly render object data */}
                  <div>
                    <p>{product.testimonio}</p>
                    <div>{product.author}</div>
                    <div>{product.date}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex gap-8 mx-12 sm:mx-0">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}