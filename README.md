# TelBots
TelBots is a centralized platform that analyzes, verifies, and ranks Telegram bots.
It acts as an infrastructure layer for bot creators — giving them analytics, trust scoring, verification, and category intelligence.

# Core Features

Bot Directory – Public listing of all verified bots with categories, search, and rankings.

Bot Verification Layer – Uses GramJS under the hood to confirm ownership and fetch bot metadata directly from Telegram.

Creator Dashboard – Each user sees analytics and intelligence based on their subscription plan:

Starter: basic bot data

Pro: full analytics, category performance, review insights

Enterprise: advanced intelligence, sponsored visibility, API access

Subscription System – Users choose a plan immediately after signup. UI adapts to their plan.

Authentication System – Full JWT auth (login/register/forgot password), plan gating, and protected routes.

# Tech Stack

Frontend: React, TailwindCSS, Framer Motion

Backend: Node.js, Express, MongoDB, JWT

Telegram Integration: GramJS

Payments: Ready for integration with Stripe/Paystack

# What This App Does

It gives bot creators a single place to manage their bots, verify ownership, see how their bots perform, and access deep intelligence depending on their subscription plan.
