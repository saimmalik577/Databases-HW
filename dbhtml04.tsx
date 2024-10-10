import { Link } from "wouter";
import {
	Button,
	ContentTemplate,
	Slider,
	SliderArrowLeft,
	SliderArrowRight,
} from "@shared/ui";

import safe from "@shared/assets/safe.png";
import shelf from "@shared/assets/shelf.png";
import toolkit from "@shared/assets/toolkit.png";
import catalogue from "@shared/assets/catalogue.png";
import rack from "@shared/assets/rack.jpeg";

export const HomePage: React.FC = () => {
	return (
		<ContentTemplate>
			<SliderSection />

			<div className="home-section">
				<div className="flex-col gap-y-8">
					<h3 className="text-4xl font-semibold text-primary">
						Barys Metal is...
					</h3>

					<p className="whitespace-pre-line">
						{`The trading and manufacturing company Barys has been operating since 2017. Our main areas of activity include:
                        - production of construction equipment;
						- production of metal products and medical equipment;
                        - manufacturing of decorative and sports items from metal;
						- production of metal furniture.
						`}
					</p>

					<Link to="/about">
						<Button color="secondary" className="w-fit py-2">
							Learn More
						</Button>
					</Link>
				</div>

				<img
					src={catalogue}
					alt="Catalogue"
					className="w-96 object-contain"
				/>
			</div>

			<div className="homepage-cards mt-16">
				{Array.from({ length: 5 }).map((_, idx) => (
					<Link key={idx} to="/shelves" className="w-1/3 p-4">
						<div className="card">
							<div className="flex justify-center items-center gap-x-2">
								{Array.from({ length: 3 }).map((_, idx) => (
									<img
										key={idx}
										src={rack}
										alt="Shelf"
										className="w-1/3 object-contain"
									/>
								))}
							</div>

							<h5 className="text-lg font-semibold text-paper-contrast">
								Shelves
							</h5>
						</div>
					</Link>
				))}
			</div>

			{/* Disclaimer Section */}
			<div className="disclaimer mt-16">
				<p>
					This website is student lab work and does not necessarily reflect Constructor University opinions.
					Constructor University does not endorse this site, nor is it checked by Constructor University regularly,
					nor is it part of the official Constructor University web presence.
				</p>
				<p>
					For each external link existing on this website, we initially have checked that the target page does not contain
					contents which are illegal with respect to German jurisdiction. However, as we have no influence on such contents,
					this may change without our notice. Therefore, we deny any responsibility for the websites referenced through
					our external links from here.
				</p>
				<p>No information conflicting with GDPR is stored on the server.</p>
			</div>
		</ContentTemplate>
	);
};

const SliderSection: React.FC = () => {
	return (
		<Slider
			slidesToShow={1}
			className="slider-container"
			nextArrow={<SliderArrowRight />}
			prevArrow={<SliderArrowLeft />}
			autoplay
			autoplaySpeed={3000}
			speed={1000}
		>
			<div className="slider-slide">
				<div className="flex-col gap-y-8 justify-center">
					<h3 className="font-semibold text-4xl">
						Perfect Metal Solutions
					</h3>

					<p className="text-lg pr-40">
						Your reliable partner in the world of metal products
					</p>

					<Button view="reversed" className="w-fit text-lg py-2">
						Order Now
					</Button>
				</div>

				<div className="flex items-center mt-12">
					<div className="relative">
						<img
							src={safe}
							alt="Safe"
							className="w-80 h-auto object-contain"
						/>

						<div className="absolute right-[calc(100%+1rem)] bottom-6">
							<div className="relative">
								<div className="absolute bottom-6 left-6 flex flex-col">
									<h6 className="text-secondary font-semibold">
										Safe
									</h6>

									<span className="font-medium text-primary-contrast">
										25,000 KZT
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="slider-slide bg-primary-contrast text-primary">
				<div className="flex-col gap-y-8 justify-center">
					<h3 className="font-semibold text-4xl">
						High-Quality Metal Products
					</h3>

					<p className="text-lg pr-40">
						Durable solutions for home and business
					</p>

					<Button className="w-fit text-lg py-2">
						Order Now
					</Button>
				</div>

				<div className="flex items-center mt-12">
					<div className="relative">
						<img
							src={shelf}
							alt="Shelf"
							className="w-80 h-auto object-contain"
						/>

						<div className="absolute right-[calc(100%)] bottom-16">
							<div className="relative">
								<div className="absolute bottom-6 left-6 flex flex-col">
									<h6 className="text-secondary font-semibold">
										Shelf
									</h6>

									<span className="font-medium text-primary">
										25,000 KZT
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="slider-slide bg-primary-contrast text-primary">
				<div className="flex-col gap-y-8 justify-center">
					<h3 className="font-semibold text-4xl">
						Wide Range of Metal Products
					</h3>

					<p className="text-lg pr-40">
						From small items to large-scale projects – all made of metal
					</p>

					<Button className="w-fit text-lg py-2">
						Order Now
					</Button>
				</div>

				<div className="flex items-center mt-12">
					<div className="relative">
						<img
							src={toolkit}
							alt="Cabinet"
							className="w-80 h-auto object-contain"
						/>

						<div className="absolute right-[calc(100%+1rem)] bottom-24">
							<div className="relative">
								<div className="absolute bottom-6 left-6 flex flex-col">
									<h6 className="text-secondary font-semibold">
										Cabinet
									</h6>

									<span className="font-medium text-primary">
										25,000 KZT
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Slider>
	);
};
