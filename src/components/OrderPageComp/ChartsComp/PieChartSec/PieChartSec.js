import { Pie } from '@ant-design/plots';

const PieChartSec = ({design,technicalSupport,celebrities}) => {
	const data = [
		{ name: 'Group A', value: design },
		{ name: 'Group B', value: technicalSupport },
		{ name: 'Group C', value: celebrities },
	];
	const COLORS = ['#C0E9FF', '#5EBFF2', '#237EAE'];
	const TITLES = ['خدمات التصميم', 'خدمات إدارة المتجر', 'خدمات المشاهير'];
	const total = data.reduce((a, b) => {
		if (b < 5) {
			return;
		}
		return a + b.value;
	}, 0);
	const config = {
		appendPadding: 10,
		data,
		angleField: 'value',
		colorField: 'name',
		tooltip: false,
		radius: 5,
		color: COLORS,
		radius: 1,
		height: 140,
		width: 100,
		innerRadius: 0.85,
		legend: false,
		annotations: [
			{
				type: 'regionFilter',
				position: ['', '0'],
				content: '0',
				style: {
					fill: 'red',
				},
			},
		],
		label: {
			content: '',
		},
		statistic: {
			title: false,
			content: {
				style: {
					whiteSpace: 'pre-wrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					fontSize: '1rem',
					lineHeight: '1.5rem',
					fontWeight: '600',
					color: '#02466A',
				},
				content: `${total}\nطلب خدمة`,
			},
		},
	};
	return (
		<div className='flex md:flex-row flex-col items-center gap-2 justify-between w-full'>
			<div className='flex-1'>
				<Pie {...config} />
			</div>

			<div className='flex-1 flex flex-col justify-center gap-4'>
				<div className='flex-1 flex flex-col justify-center gap-4'>
					{COLORS.map((color, idx) => {
						return (
							<div className='flex gap-2 items-center'>
								<div className=' h-4 w-4 rounded-full' style={{ backgroundColor: `${color}` }}></div>
								<h2 className='font-normal text-lg'>{data[idx].value}</h2>
								<h2 className='font-normal text-lg'>{TITLES[idx]}</h2>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default PieChartSec;
