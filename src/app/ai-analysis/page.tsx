"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Brain, Target, AlertTriangle, Layers, BarChart3, CheckCircle, XCircle } from "lucide-react"

interface AnalysisResult {
  starId: string
  predictedLabel: string
  confidenceScore: number
  model: string
  timestamp: string
}

interface ConfusionMatrix {
  actual: string[]
  predicted: string[]
  matrix: number[][]
}

const mockResults: AnalysisResult[] = [
  { starId: "KIC-1234567", predictedLabel: "Exoplanet", confidenceScore: 0.89, model: "CNN", timestamp: "2024-01-15 10:30" },
  { starId: "KIC-2345678", predictedLabel: "No Planet", confidenceScore: 0.76, model: "Random Forest", timestamp: "2024-01-15 10:32" },
  { starId: "KIC-3456789", predictedLabel: "Exoplanet", confidenceScore: 0.92, model: "CNN", timestamp: "2024-01-15 10:35" },
  { starId: "KIC-4567890", predictedLabel: "Anomaly", confidenceScore: 0.68, model: "CNN", timestamp: "2024-01-15 10:38" },
  { starId: "KIC-5678901", predictedLabel: "No Planet", confidenceScore: 0.84, model: "Random Forest", timestamp: "2024-01-15 10:40" },
]

const mockConfusionMatrix: ConfusionMatrix = {
  actual: ["Exoplanet", "No Planet", "Anomaly"],
  predicted: ["Exoplanet", "No Planet", "Anomaly"],
  matrix: [
    [45, 3, 2],
    [2, 38, 1],
    [1, 2, 8]
  ]
}

const mockMetrics = {
  accuracy: 0.892,
  precision: 0.876,
  recall: 0.864,
  f1: 0.870
}

export default function AIAnalysis() {
  const [results, setResults] = useState<AnalysisResult[]>(mockResults)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedAnalysis, setSelectedAnalysis] = useState<string | null>(null)

  const runAnalysis = async (analysisType: string) => {
    setIsAnalyzing(true)
    setSelectedAnalysis(analysisType)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Add mock result
    const newResult: AnalysisResult = {
      starId: `KIC-${Math.floor(Math.random() * 9000000) + 1000000}`,
      predictedLabel: analysisType === "Exoplanet Detection" ? 
        (Math.random() > 0.5 ? "Exoplanet" : "No Planet") :
        analysisType === "Anomaly Detection" ?
        (Math.random() > 0.3 ? "Anomaly" : "Normal") :
        "Class A",
      confidenceScore: 0.7 + Math.random() * 0.25,
      model: Math.random() > 0.5 ? "CNN" : "Random Forest",
      timestamp: new Date().toLocaleString()
    }
    
    setResults([newResult, ...results])
    setIsAnalyzing(false)
    setSelectedAnalysis(null)
  }

  const getConfidenceColor = (score: number) => {
    if (score >= 0.8) return "text-green-600"
    if (score >= 0.6) return "text-yellow-600"
    return "text-red-600"
  }

  const getLabelColor = (label: string) => {
    switch (label) {
      case "Exoplanet": return "bg-green-100 text-green-800"
      case "No Planet": return "bg-gray-100 text-gray-800"
      case "Anomaly": return "bg-red-100 text-red-800"
      default: return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Analysis</h2>
          <p className="text-muted-foreground">
            Run machine learning analysis on your space data
          </p>
        </div>

        {/* Analysis Buttons */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Analysis Tools
            </CardTitle>
            <CardDescription>
              Select an analysis type to run on your uploaded data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => runAnalysis("Exoplanet Detection")}
                disabled={isAnalyzing}
                className="h-20 flex flex-col items-center justify-center gap-2"
                variant="outline"
              >
                <Target className="h-6 w-6" />
                <span>Exoplanet Candidate Detection</span>
                {isAnalyzing && selectedAnalysis === "Exoplanet Detection" && (
                  <div className="text-xs text-muted-foreground">Running...</div>
                )}
              </Button>
              
              <Button
                onClick={() => runAnalysis("Anomaly Detection")}
                disabled={isAnalyzing}
                className="h-20 flex flex-col items-center justify-center gap-2"
                variant="outline"
              >
                <AlertTriangle className="h-6 w-6" />
                <span>Anomaly Detection</span>
                {isAnalyzing && selectedAnalysis === "Anomaly Detection" && (
                  <div className="text-xs text-muted-foreground">Running...</div>
                )}
              </Button>
              
              <Button
                onClick={() => runAnalysis("Object Classification")}
                disabled={isAnalyzing}
                className="h-20 flex flex-col items-center justify-center gap-2"
                variant="outline"
              >
                <Layers className="h-6 w-6" />
                <span>Object Classification</span>
                {isAnalyzing && selectedAnalysis === "Object Classification" && (
                  <div className="text-xs text-muted-foreground">Running...</div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Table */}
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>
              Results from AI analysis showing predicted labels and confidence scores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Star ID</TableHead>
                    <TableHead>Predicted Label</TableHead>
                    <TableHead>Confidence Score</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{result.starId}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getLabelColor(result.predictedLabel)}`}>
                          {result.predictedLabel}
                        </span>
                      </TableCell>
                      <TableCell className={getConfidenceColor(result.confidenceScore)}>
                        {(result.confidenceScore * 100).toFixed(1)}%
                      </TableCell>
                      <TableCell>{result.model}</TableCell>
                      <TableCell>{result.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(mockMetrics.accuracy * 100).toFixed(1)}%</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Precision</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(mockMetrics.precision * 100).toFixed(1)}%</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recall</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(mockMetrics.recall * 100).toFixed(1)}%</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">F1 Score</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(mockMetrics.f1 * 100).toFixed(1)}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Confusion Matrix */}
        <Card>
          <CardHeader>
            <CardTitle>Confusion Matrix</CardTitle>
            <CardDescription>
              Model performance breakdown by actual vs predicted classifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2 text-left"></th>
                    {mockConfusionMatrix.predicted.map((label) => (
                      <th key={label} className="border p-2 text-center font-medium">
                        Predicted {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockConfusionMatrix.actual.map((actualLabel, i) => (
                    <tr key={actualLabel}>
                      <td className="border p-2 font-medium">Actual {actualLabel}</td>
                      {mockConfusionMatrix.matrix[i].map((value, j) => (
                        <td key={j} className="border p-2 text-center">
                          <span className={`px-2 py-1 rounded ${
                            i === j ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {value}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
