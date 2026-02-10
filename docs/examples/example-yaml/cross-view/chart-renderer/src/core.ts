import {
  createSegmentRenderer,
} from '@vunk/core/components/segment-renderer'

export const {
  SegmentRenderer: ChartRenderer,
  SegmentView,
  Segment: ChartSegment,
} = createSegmentRenderer(Symbol('chart'))
