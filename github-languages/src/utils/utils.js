import * as R from 'ramda'

export const isNotEmpty = R.compose(R.not, R.isEmpty)