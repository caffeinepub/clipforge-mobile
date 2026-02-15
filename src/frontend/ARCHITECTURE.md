# ClipForge Mobile - Frontend Architecture

## Overview

ClipForge Mobile is a mobile-first, offline-capable video and photo editing web application built with React, TypeScript, and Tailwind CSS. The app runs in the browser with a native-like experience and supports dynamic updates via remote configuration.

## Technology Stack

- **Framework**: React 19 + TypeScript
- **Routing**: TanStack Router
- **State Management**: React Query (TanStack Query) for server state, React Context for UI state
- **Styling**: Tailwind CSS with OKLCH color system
- **UI Components**: shadcn/ui (Radix primitives)
- **Storage**: IndexedDB for offline data persistence
- **Backend**: Internet Computer (Motoko canister)

## Folder Structure

