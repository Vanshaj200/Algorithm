
# Algorithm
Space tech project
=======
# Celestial AI Dashboard

A full-stack web application for space data analysis and AI-powered exoplanet detection.

## Features

### 🏠 Dashboard Overview
- Real-time statistics and metrics
- Recent activity feed
- Quick action buttons
- Responsive design

### 📊 Data Hub
- Upload CSV/JSON files containing light curve data
- Data preprocessing controls (normalize, detrend, filter noise)
- Scrollable data table with quality indicators
- Data statistics and metrics

### 🤖 AI Analysis
- **Exoplanet Candidate Detection**: Identify potential exoplanets from light curve data
- **Anomaly Detection**: Find unusual patterns in stellar observations
- **Object Classification**: Classify different types of celestial objects
- Results table with confidence scores
- Performance metrics (Accuracy, Precision, Recall, F1)
- Confusion matrix visualization

### 📈 Visualization
- **Interactive Light Curves**: Time series charts showing flux variations
- **Confidence Score Scatter Plots**: Visualize model confidence across stars
- **Class Distribution Bar Charts**: Show predicted class counts
- Dynamic controls for:
  - Star ID selection
  - Model type (CNN, Random Forest, SVM)
  - Classification threshold slider
- Real-time chart updates based on controls

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: TailwindCSS with shadcn/ui components
- **Charts**: Recharts for interactive visualizations
- **Icons**: Lucide React
- **State Management**: React hooks

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── data-hub/          # Data upload and management
│   ├── ai-analysis/       # AI analysis tools
│   ├── visualization/     # Interactive charts
│   └── page.tsx          # Dashboard home
├── components/
│   ├── layout/           # Dashboard layout components
│   └── ui/              # Reusable UI components
└── lib/                 # Utility functions
```

## Key Components

### Layout Components
- `DashboardLayout`: Main layout with sidebar and header
- `Sidebar`: Navigation sidebar with menu items
- `Header`: Top navigation bar

### UI Components
- `Button`: Customizable button component
- `Card`: Content card with header, content, and footer
- `Table`: Data table with sorting and styling
- `Select`: Dropdown selection component
- `Slider`: Range slider for threshold controls

### Pages
- **Home**: Dashboard overview with statistics and quick actions
- **Data Hub**: File upload, preprocessing, and data management
- **AI Analysis**: Machine learning analysis tools and results
- **Visualization**: Interactive charts and data exploration

## Features in Detail

### Data Management
- Support for CSV and JSON file uploads
- Data quality indicators (Good, Fair, Poor)
- Preprocessing toggles for data preparation
- Real-time statistics and metrics

### AI Analysis
- Mock AI backend with realistic response times
- Multiple analysis types with different models
- Confidence scoring and result visualization
- Performance metrics and confusion matrices

### Interactive Visualizations
- Responsive charts that update based on user controls
- Multiple chart types (line, scatter, bar)
- Real-time filtering and threshold adjustments
- Professional styling with hover effects

## Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## Future Enhancements

- Real ML model integration
- Advanced data preprocessing options
- Export functionality for results
- User authentication and data persistence
- Real-time data streaming
- Advanced visualization options

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License
