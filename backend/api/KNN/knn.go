package knn

import "math"

type knn struct {
	k      int
	data   [][]float64
	labels []string
}

// NOTE: 
/*
1. Find Distance
2. Set K value
3. Maximum voting
4. Result
*/

func distance(x1 float64, x2 float64, y1 float64, y2 float64) float64 {
	// Eucledian Distance
	return math.Sqrt(math.Pow((x2-x1), 2) + math.Pow((y2-y1), 2))
}
