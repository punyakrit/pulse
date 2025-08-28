# Pulse - Website Monitoring & Uptime Tracking

Pulse is a comprehensive website monitoring platform that helps you track your websites' uptime, performance, and availability 24/7. Get instant alerts when downtime occurs and keep your business running smoothly with detailed analytics.

## Features

- **24/7 Website Monitoring** - Continuous monitoring 
- **Instant Downtime Alerts** - Get notified via email, SMS, or Slack when issues occur
- **Global Monitoring** - Checks from multiple worldwide locations to avoid false alarms
- **Detailed Analytics** - Track uptime percentages, response times, and historical performance
- **Multi-Project Support** - Organize and monitor multiple websites across different projects
- **Performance Metrics** - Monitor response times, SSL validity, DNS performance, and more
- **Uptime Logging** - Comprehensive logs of uptime, downtime, and performance metrics

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Radix UI components
- **State Management**: Redux Toolkit with React Redux
- **Authentication**: Kinde Auth
- **Database**: PostgreSQL with Prisma ORM
- **Charts**: Recharts for analytics visualization
- **Icons**: Lucide React
- **Theme**: Next-themes for dark/light mode support

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Kinde Auth account (for authentication)


## Project Structure

```
pulse/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── (landing)/         # Landing page routes
│   │   ├── api/               # API routes
│   │   └── dashboard/         # Dashboard routes
│   ├── components/            # React components
│   │   ├── dashboard/         # Dashboard-specific components
│   │   ├── global/            # Global components
│   │   ├── landing/           # Landing page components
│   │   └── ui/                # Reusable UI components
│   ├── customHooks/           # Custom React hooks
│   ├── hooks/                 # Utility hooks
│   └── lib/                   # Utilities and configurations
│       ├── actions/           # Database actions
│       ├── providers/         # Context providers
│       ├── reducers/          # Redux reducers
│       └── store/             # Redux store configuration
├── prisma/                    # Database schema and migrations
└── public/                    # Static assets
```

## Database Schema

The application uses PostgreSQL with the following main entities:

- **User**: Authentication and user management
- **Project**: Groups of websites to monitor
- **Website**: Individual websites being monitored
- **Check**: Individual monitoring checks with performance data
- **Alert**: Downtime and performance alerts
- **PerformanceMetric**: Detailed performance measurements
- **UptimeLog**: Daily uptime statistics
- **Setting**: Project-specific monitoring settings
