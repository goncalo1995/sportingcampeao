import NumberFlow, { continuous, type Format } from '@number-flow/react'
import clsx from 'clsx/lite'
import { Bookmark, ChartNoAxesColumn, Heart, Repeat, Share } from 'lucide-react'
const format: Format = {
	notation: 'compact',
	compactDisplay: 'short'
}
type Props = JSX.IntrinsicElements['div'] & {
	likes: number
	reposts: number
	views: number
	liked: boolean
	reposted: boolean
	onLike: () => void
	onShare: () => void
}
export default function Activity({
	className,
	likes,
	reposts,
	views,
	onLike,
    onShare,
	liked,
	reposted,
	...rest
}: Props) {
	return (
		<div
			{...rest}
			className={clsx(
				className,
				'flex w-full max-w-xl px-4 py-8 select-none items-center text-primary text-2xl'
			)}
		>
			<div className="flex flex-1 items-center gap-2.5 ml-8">
				<ChartNoAxesColumn color='green' absoluteStrokeWidth className="~size-4/5" />
				<NumberFlow
					willChange
					plugins={[continuous]}
					value={views}
					locales="en-US"
					format={format}
				/>
			</div>
			{/* <Share color='green' absoluteStrokeWidth className="" /> */}
            {/* <div className="flex-1">
				<button
					className={clsx(
						'group flex items-center gap-2.5 ml-8 pr-1.5 transition-[color]',
						reposted && 'text-emerald-500'
					)}
					onClick={onShare}
				>
					<div className="relative before:absolute before:-inset-2.5 before:rounded-full before:transition-[background-color] before:group-hover:bg-emerald-500/10">
						<Share
                            color='green'
							absoluteStrokeWidth
							className="~size-4/5 group-active:spring-duration-[25] spring-bounce-50 spring-duration-300 transition-transform group-active:scale-[85%]"
						/>
					</div>
				</button>
			</div> */}
			<div className="~size-4/5 shrink-0">
				<button
					className={clsx(
						'group flex items-center gap-2.5 mx-4 pr-1.5 transition-[color]',
						liked && 'text-primary'
					)}
					onClick={onLike}
				>
					<div className="relative before:absolute before:-inset-2.5 before:rounded-full before:transition-[background-color] before:group-hover:bg-emerald-500/10">
						<Heart
                            color='green'
							absoluteStrokeWidth
							className={clsx(
								'~size-4/5 group-active:spring-duration-[25] spring-bounce-[65] spring-duration-300 transition-transform group-active:scale-[80%]',
								liked && 'fill-current'
							)}
						/>
					</div>
					<NumberFlow
						willChange
						plugins={[continuous]}
						value={likes}
						locales="en-US"
						format={format}
					/>
				</button>
			</div>
		</div>
	)
}