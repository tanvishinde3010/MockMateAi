
AI Mock Interview Platform 
What it does: Conducts mock interviews Asks technical/HR questions Records answers is there any existing options are available in market Gives feedback and scores# Chapter 1 – Project Overview

# MockMate AI – Frontend Product Requirement Document

**Version:** 1.0

**Document Type:** Frontend Product Requirement Document (Frontend PRD)

**Project Category:** AI-Powered Web Application

---

# 1.1 Project Introduction

## Project Name

**MockMate AI – Your Personal AI Interview Coach**

---

## Project Description

MockMate AI is an AI-powered web platform designed to help students and fresh graduates prepare for technical and HR interviews through realistic mock interview experiences.

Unlike traditional interview preparation websites that simply display interview questions or provide reading material, MockMate AI creates an interactive interview environment where users actively participate in simulated interviews.

The platform behaves like a real interviewer. It asks questions, waits for responses, evaluates answers using Artificial Intelligence, provides constructive feedback, identifies weak areas, and tracks the user's progress over time.

The product should not feel like a quiz application.

Instead, it should feel like having a personal interview mentor available anytime.

The overall experience should be modern, professional, motivating, and stress-free.

---

# 1.2 Problem Statement

Preparing for interviews is one of the biggest challenges faced by students during placement season.

Although thousands of interview questions are available online, students rarely get an opportunity to practice in a realistic interview environment.

Most students experience the following problems:

• They don't know how interviews actually flow.

• They become nervous while speaking.

• They memorize answers instead of understanding concepts.

• They don't receive personalized feedback.

• They don't know which technical topics they are weak in.

• They cannot track whether they are improving.

Existing preparation methods mainly focus on reading interview questions instead of practicing interviews.

Because of this, students often lose confidence during real interviews despite having sufficient technical knowledge.

MockMate AI aims to solve this problem by providing realistic AI-powered mock interviews along with detailed performance analysis.

---

# 1.3 Vision

To become the most student-friendly AI interview preparation platform that helps users build confidence, improve communication, strengthen technical knowledge, and become placement-ready.

The platform should feel less like software and more like a supportive mentor that guides users throughout their interview preparation journey.

---

# 1.4 Mission

Our mission is to transform interview preparation from passive learning into active practice.

Instead of spending hours watching videos or reading interview questions, students should be able to practice realistic interviews, receive meaningful AI feedback, and continuously improve.

Every interview should teach something new.

Every feedback report should help users grow.

---

# 1.5 Product Goals

The primary goals of MockMate AI are:

### Goal 1 – Build Confidence

Help students become comfortable answering interview questions under realistic conditions.

---

### Goal 2 – Improve Communication

Encourage users to explain their thoughts clearly instead of memorizing predefined answers.

---

### Goal 3 – Personalized Feedback

Provide AI-generated feedback highlighting strengths, weaknesses, and areas for improvement.

---

### Goal 4 – Continuous Progress Tracking

Allow users to view their interview history and monitor improvement over time.

---

### Goal 5 – Modern User Experience

Deliver a premium, clean, and intuitive interface comparable to modern SaaS products.

---

# 1.6 Target Audience

The platform is primarily designed for:

### Primary Users

• Engineering students

• Computer Science students

• Final-year students

• Fresh graduates

• Placement aspirants

• Internship applicants

---

### Secondary Users

• Working professionals preparing for job switches

• Career counselors (future)

• Colleges (future)

---

# 1.7 User Personas

## Persona 1 – Engineering Student

Name: Rahul

Age: 21

Goal:

Prepare for campus placements.

Problems:

• Doesn't know interview structure.

• Nervous while answering.

• Needs feedback.

Expected Experience:

Quick setup.

Simple interface.

Realistic interview simulation.

---

## Persona 2 – Fresh Graduate

Name: Priya

Age: 23

Goal:

Prepare for software developer interviews.

Problems:

• Doesn't know which topics are weak.

• Wants regular practice.

Expected Experience:

Progress tracking.

Company-specific interviews.

Learning suggestions.

---

# 1.8 Product Philosophy

MockMate AI is **not** just another AI chatbot.

It is a personal interview coach.

Every screen should encourage users to practice rather than simply consume information.

The application should motivate users to return regularly by making progress visible.

The platform should always feel supportive rather than intimidating.

Feedback should focus on improvement instead of criticism.

---

# 1.9 Core Features (Version 1)

The first version of the application focuses on creating a complete interview practice experience.

Core features include:

• User Registration

• Login

• Dashboard

• Interview Role Selection

• Technical Interview

• HR Interview

• AI-generated Questions

• Answer Submission

• AI Feedback

• Interview Score

• Interview History

• Performance Dashboard

• User Profile

• Settings

These features together create the minimum complete interview practice experience.

---

# 1.10 Future Features

Future versions of MockMate AI may include:

• Resume-based interviews

• Voice interviews

• Coding interviews

• Adaptive follow-up questions

• Company-specific interview modes

• AI learning roadmap

• Daily interview challenges

• Leaderboards

• Recruiter dashboard

• College administrator dashboard

These features are outside Version 1 but should be considered while designing the frontend to ensure scalability.

---

# 1.11 User Journey

The expected user journey is as follows:

Visitor visits Landing Page

↓

Reads about the platform

↓

Creates an account

↓

Logs into Dashboard

↓

Chooses interview type

↓

Starts interview

↓

Answers AI questions

↓

Receives AI feedback

↓

Views results

↓

Checks interview history

↓

Practices again

This journey should be simple, intuitive, and require minimal effort from the user.

---

# 1.12 Product Personality

The application's personality should be:

Professional

Friendly

Encouraging

Minimal

Modern

Reliable

Avoid making the interface feel overly academic or robotic.

Instead, create an experience that feels motivating and enjoyable.

---

# 1.13 Frontend Success Criteria

The frontend will be considered successful if users can:

• Understand the product within 10 seconds of visiting.

• Register within 2 minutes.

• Start an interview within 30 seconds after logging in.

• Navigate the application without confusion.

• Easily understand AI feedback.

• Feel encouraged to return and continue practicing.

---

# 1.14 Design Principles

Every page designed for MockMate AI should follow these principles:

1. Simplicity over complexity.

2. One primary action per screen.

3. Consistent navigation.

4. Clear visual hierarchy.

5. Accessible design.

6. Minimal cognitive load.

7. Responsive across desktop, tablet, and mobile.

8. Modern SaaS aesthetic.

9. Friendly, encouraging tone.

10. Consistent branding throughout the application.

---

# Chapter Summary

This chapter defines the vision, purpose, users, and overall direction of MockMate AI.

The following chapters will translate this vision into a detailed frontend design, beginning with the Design System and then a page-by-page specification for every screen in the application.
# Chapter 2 – Frontend Design System

# MockMate AI – Frontend Product Requirement Document

---

# 2.1 Purpose of the Design System

The Design System defines the complete visual identity and interaction language of MockMate AI.

Its purpose is to ensure that every page, component, button, card, form, and interaction follows the same design principles.

Users should never feel like different pages belong to different applications.

Every screen must feel connected, consistent, and professionally designed.

The design language should resemble a modern SaaS product rather than a traditional educational website.

The UI should be clean, calm, premium, and confidence-inspiring.

---

# 2.2 Design Philosophy

The application should communicate trust and professionalism while remaining approachable for students.

The interface should feel like a personal AI mentor rather than a testing portal.

Every visual decision should reduce stress and help users focus on interview preparation.

Avoid unnecessary decorations, excessive gradients, flashy animations, or crowded layouts.

The UI should prioritize clarity over visual complexity.

Design inspiration should come from modern SaaS products such as Linear, Notion, Vercel, Clerk, and Stripe Dashboard.

---

# 2.3 Overall Theme

Theme Style:
Modern SaaS

Appearance:
Light Theme (Primary Version)

Future Support:
Dark Mode (Version 2)

Mood:
Professional
Friendly
Minimal
Elegant
Motivating

The application should immediately communicate:
"This platform is trustworthy and built for serious interview preparation."

---

# 2.4 Color Palette

## Primary Brand Color

Indigo

HEX: #4F46E5

Usage:

* Primary buttons
* Active navigation
* Important icons
* Progress indicators
* Selected menu items

Reason:
Indigo represents intelligence, confidence, and technology.

---

## Secondary Accent

Purple

HEX: #7C3AED

Usage:

* Secondary buttons
* Hover highlights
* Charts
* AI-related illustrations

Reason:
Purple creates a premium and modern appearance.

---

## Success Color

Green

HEX: #22C55E

Usage:

* Success messages
* High interview scores
* Completed interviews
* Positive AI feedback

---

## Warning Color

Orange

HEX: #F59E0B

Usage:

* Medium scores
* Recommendations
* Caution messages

---

## Error Color

Red

HEX: #EF4444

Usage:

* Validation errors
* Failed login
* Incorrect answers (only when necessary)

Error colors should never feel discouraging.

---

## Background Color

HEX:
#F8FAFC

Reason:

A soft off-white background reduces eye strain and keeps the interface clean.

---

## Card Color

White

Cards should slightly elevate above the background using soft shadows.

---

## Text Colors

Primary Text:
#111827

Secondary Text:
#6B7280

Disabled Text:
#9CA3AF

Never use pure black for text.

---

# 2.5 Typography

Primary Font:
Poppins

Usage:
Headings

Reason:
Modern, friendly, excellent readability.

---

Secondary Font:
Inter

Usage:
Paragraphs
Descriptions
Forms
Buttons

Reason:
Optimized for digital interfaces.

---

Font Scale

Page Heading:
40px

Section Heading:
28px

Card Title:
20px

Body Text:
16px

Caption:
14px

Small Labels:
12px

Maintain consistent typography hierarchy across all pages.

---

# 2.6 Layout Grid

Desktop Width:
1440px

Maximum Content Width:
1280px

Grid:
12 Columns

Page Padding:
32px

Card Spacing:
24px

Section Margin:
64px

The interface should feel spacious rather than compressed.

---

# 2.7 Border Radius

Buttons:
12px

Cards:
16px

Input Fields:
12px

Modals:
20px

Charts:
16px

Rounded corners should create a friendly appearance without looking childish.

---

# 2.8 Elevation & Shadows

Use soft shadows only.

Avoid heavy or dark shadows.

Cards:
Small shadow

Modals:
Medium shadow

Dropdowns:
Medium shadow

Floating Action Elements:
Slightly stronger shadow

The interface should feel layered but subtle.

---

# 2.9 Buttons

Three button types should exist throughout the application.

### Primary Button

Purpose:
Main action on every screen.

Color:
Indigo

Examples:
Start Interview
Login
Generate Questions
Submit Answer

Only one primary button should dominate each screen.

---

### Secondary Button

Purpose:
Alternative actions.

Examples:
Cancel
Go Back
Learn More

Use outline styling or light gray background.

---

### Ghost Button

Purpose:
Low-priority actions.

Examples:
Skip
View Details
Close

Should not attract unnecessary attention.

---

Button Behaviour

Hover:
Slightly darker background.

Click:
Small scale animation.

Disabled:
Reduced opacity.

Loading:
Spinner replaces button icon.

---

# 2.10 Input Fields

All inputs should have:

Rounded corners

Soft border

Clear placeholder text

Focused border in primary color

Optional icons

Validation messages directly below the field.

Avoid using browser default styles.

---

# 2.11 Cards

Cards are the primary container across the application.

Cards should contain:

Title

Optional icon

Main content

Footer action (if required)

Cards should never feel crowded.

Maintain internal padding of 24px.

---

# 2.12 Icons

Use a single icon library throughout the project.

Recommended:

Lucide Icons

Reasons:

Modern

Minimal

Consistent stroke width

Readable

Icons should always support text rather than replace it.

---

# 2.13 Illustrations

Illustrations should appear only where they improve understanding.

Recommended locations:

Landing Page

Empty States

AI Analysis Screen

404 Page

Avoid using illustrations on every screen.

---

# 2.14 Charts

Charts should use rounded corners and subtle colors.

Preferred chart types:

Line Chart

Bar Chart

Circular Progress

Radar Chart (Results)

Charts should emphasize trends rather than decorative visuals.

---

# 2.15 Animations

Animations should feel natural.

Recommended:

Fade In

Slide Up

Scale

Progress Animation

Card Hover

Avoid:

Bounce

Flash

Overly dramatic transitions

Animation duration:
200–300ms

---

# 2.16 Responsive Design

The application should support:

Desktop (Primary)

Tablet

Mobile

Desktop should not simply shrink.

Layouts should reorganize intelligently.

Sidebar becomes drawer on mobile.

Cards stack vertically.

Buttons become full-width where appropriate.

---

# 2.17 Accessibility

Maintain sufficient color contrast.

Keyboard navigation must work across all forms.

Interactive elements should have visible focus indicators.

Use semantic HTML.

Avoid conveying information using color alone.

---

# 2.18 Empty States

Every page without data should display:

Friendly illustration

Short explanation

Primary action button

Example:

"No interviews yet.
Start your first mock interview to begin tracking your progress."

---

# 2.19 Loading States

Avoid blank screens.

Use:

Skeleton loaders

Button loading indicators

Progress animations

Loading messages should reassure users.

Example:

"Preparing your AI interviewer..."

---

# 2.20 Error States

Errors should be helpful rather than alarming.

Instead of:

"Something went wrong."

Use:

"We couldn't generate your interview right now. Please try again."

Provide retry actions whenever possible.

---

# 2.21 Micro-interactions

Micro-interactions improve the overall experience.

Examples:

Button hover

Card elevation

Input focus

Progress bar updates

Toast notifications

Score animation

Profile menu transition

These interactions should be subtle and consistent.

---

# 2.22 Frontend Quality Standards

Every page generated for MockMate AI should:

Look consistent.

Use the same spacing rules.

Maintain typography hierarchy.

Follow the defined color palette.

Reuse common components.

Prioritize readability.

Be fully responsive.

Feel polished and production-ready.

---

# Chapter Summary

This Design System establishes the visual foundation for MockMate AI.

All subsequent chapters—including Landing Page, Login, Dashboard, Interview, Results, and Profile—must strictly follow these design guidelines to ensure a cohesive, premium, and scalable user experience.
Excellent. Now we start the **Product Design** part of the PRD.

From this chapter onward, Stitch will start understanding **how the application should work** instead of just **how it should look**.

This chapter is extremely important because it defines the complete navigation and user flow before we design individual pages.

---

# Chapter 3 – Information Architecture & User Journey

## MockMate AI – Frontend Product Requirement Document

---

# 3.1 Purpose of this Chapter

This chapter defines how users move through the application.

Instead of designing isolated screens, this section explains how every page connects to the next page and what users should accomplish at each step.

A well-structured information architecture ensures users never feel lost while navigating the application.

The navigation should feel intuitive, predictable, and require minimal learning.

---

# 3.2 User Journey Overview

The primary user journey for MockMate AI is designed to be simple and goal-oriented.

The user should be able to go from discovering the platform to completing their first interview within a few minutes.

### Primary Journey

```
Landing Page
        │
        ▼
Login / Sign Up
        │
        ▼
Dashboard
        │
        ▼
Start Interview
        │
        ▼
Interview Session
        │
        ▼
AI Analysis
        │
        ▼
Results
        │
        ▼
Dashboard
```

This journey represents the core experience of the application.

Every page should naturally guide users toward the next step.

---

# 3.3 Secondary Navigation Flow

After completing an interview, users can explore additional sections.

```
Dashboard
│
├── Start Interview
├── Interview History
├── Analytics
├── Profile
└── Settings
```

The Dashboard acts as the central hub of the application.

Users should always be able to return to it using the logo or sidebar.

---

# 3.4 Complete Sitemap

```
Landing Page
│
├── Features
├── How It Works
├── Testimonials
├── FAQ
├── About
└── Login

Login
│
└── Dashboard
    │
    ├── Home
    ├── Start Interview
    │     ├── Role Selection
    │     ├── Interview Type
    │     ├── Difficulty
    │     ├── Duration
    │     └── Start
    │
    ├── Live Interview
    │
    ├── AI Analysis
    │
    ├── Results
    │
    ├── Interview History
    │
    ├── Analytics
    │
    ├── Profile
    │
    └── Settings
```

This sitemap should remain simple.

Avoid deeply nested menus.

---

# 3.5 Global Navigation Structure

Once a user logs in, the navigation should remain consistent across all pages.

## Left Sidebar

The sidebar is the primary navigation component.

It should always remain visible on desktop.

### Navigation Items

* Dashboard
* Start Interview
* Interview History
* Analytics
* Profile
* Settings
* Logout

Each item should have:

* Icon
* Label
* Hover state
* Active state

Only one item should appear active at a time.

---

## Top Navigation Bar

The top navigation should provide quick access to user-related actions.

### Left Side

* Page Title
* Breadcrumb (optional)

### Right Side

* Search (future)
* Notifications
* Profile Avatar
* User Name
* Settings Shortcut

The top bar should remain sticky while scrolling.

---

# 3.6 Navigation Principles

Navigation throughout the application should follow these principles:

### Consistency

Navigation placement should never change.

Users should build familiarity after using the application only once.

---

### Simplicity

Avoid overwhelming users with too many navigation options.

Maximum of seven primary sidebar items.

---

### Visibility

Users should always know:

* Where they are.
* Where they came from.
* Where they can go next.

---

### Recovery

Users should always have an easy way to return to the Dashboard.

---

# 3.7 Screen Transition Flow

## Landing → Login

Primary CTA ("Start Free") directs users to Sign Up.

The Login button takes existing users directly to the Login page.

---

## Login → Dashboard

After successful authentication:

Show a welcome message.

Redirect to Dashboard.

Display a short onboarding banner for first-time users.

---

## Dashboard → Start Interview

Clicking "Start Interview" opens the Interview Setup page.

The transition should feel immediate and smooth.

---

## Interview Setup → Live Interview

After selecting interview preferences:

* Validate selections.
* Show a short loading screen.
* Display "Preparing your AI interviewer..."
* Open the Interview Screen.

---

## Live Interview → AI Analysis

When the interview ends:

Automatically navigate to the AI Analysis page.

Display a progress animation while feedback is generated.

Users should not manually refresh or navigate away.

---

## AI Analysis → Results

After analysis completes:

Automatically transition to the Results page.

No additional user action should be required.

---

## Results → Dashboard

Users can:

* Retry the interview.
* Return to Dashboard.
* View History.

Dashboard should immediately reflect the newly completed interview.

---

# 3.8 Breadcrumb Strategy

Breadcrumbs are optional.

If used, they should appear like:

Dashboard / Start Interview

Dashboard / Results

Dashboard / History

Avoid breadcrumbs on the Landing Page and Login Page.

---

# 3.9 Navigation Rules

Every navigation action should provide immediate feedback.

Examples:

* Sidebar item highlights when clicked.
* Active page indicator changes.
* Hover animation appears before clicking.
* Selected page title updates.

---

# 3.10 Empty Navigation States

If users have never completed an interview:

Dashboard should still display:

* Welcome card
* "Start First Interview" button
* Illustration
* Brief explanation of the platform

Navigation should remain unchanged.

---

# 3.11 Error Navigation

If an unexpected error occurs during navigation:

* Show a friendly message.
* Keep users on the current page.
* Offer a Retry button.

Never redirect users to a blank page.

---

# 3.12 First-Time User Experience

When a new user logs in for the first time:

Display a welcome banner:

> "Welcome to MockMate AI! Let's start your first mock interview."

Highlight the "Start Interview" option.

Avoid lengthy tutorials.

The onboarding should not take more than 30 seconds.

---

# 3.13 Returning User Experience

Returning users should immediately see:

* Greeting ("Welcome back, Tanvi 👋")
* Progress overview
* Recent interview score
* Suggested next interview

The experience should feel personalized.

---

# 3.14 Navigation Accessibility

* Sidebar must be keyboard accessible.
* Active items should be announced by screen readers.
* Focus indicators should always be visible.
* Navigation labels should never rely solely on icons.

---

# 3.15 Information Architecture Principles

The overall structure of the application should follow these principles:

* **Dashboard is the home base:** Every major action starts or ends here.
* **Keep navigation shallow:** Users should reach any feature within one or two clicks.
* **Guide, don't overwhelm:** Only show the information needed for the current task.
* **Encourage progress:** Every completed interview should naturally lead users back to practice again.

---

# Chapter Summary

This chapter defines the overall structure and navigation of MockMate AI. It establishes how users move through the application, how pages connect, and how navigation should remain consistent and intuitive.

The next chapter will begin the detailed page-by-page frontend specification, starting with the **Landing Page**. From that point onward, every page will include detailed layouts, component placement, user interactions, responsive behavior, animations, accessibility, and Stitch-specific design guidance.

---

# Chapter 4 – Landing Page Specification

# MockMate AI – Frontend Product Requirement Document

---

# 4.1 Purpose of the Landing Page

The Landing Page is the first interaction users have with MockMate AI.

Its primary purpose is **not simply to introduce the application**, but to convince visitors that this platform can genuinely improve their interview preparation.

Within the first 5–10 seconds, a visitor should understand:

* What MockMate AI does.
* Who it is built for.
* Why it is different from traditional interview preparation websites.
* Why they should create an account immediately.

The landing page should establish trust, professionalism, and excitement without overwhelming users with too much information.

The overall experience should resemble a premium SaaS website rather than an educational portal.

---

# 4.2 User Psychology

When users arrive on the landing page, they may feel:

* Nervous about placements.
* Unsure how to prepare.
* Confused by the number of interview resources available online.
* Looking for a practical solution instead of another course.

The landing page should immediately communicate:

> "You don't need to study more—you need to practice smarter."

Instead of emphasizing Artificial Intelligence, the page should emphasize **confidence, preparation, and growth**.

The AI should appear as the tool that enables those outcomes, not the main attraction.

---

# 4.3 Primary Goals

The Landing Page has five primary objectives:

### Goal 1

Explain the product clearly.

Users should understand the product within 10 seconds.

---

### Goal 2

Build trust.

The design should look polished, modern, and reliable.

---

### Goal 3

Highlight value.

Explain how MockMate AI helps users prepare more effectively than reading interview questions alone.

---

### Goal 4

Encourage registration.

The page should naturally guide users toward creating an account.

---

### Goal 5

Create excitement.

Users should feel motivated to start their first mock interview.

---

# 4.4 Layout Structure

The Landing Page should follow this exact sequence:

```
Sticky Navigation Bar

↓

Hero Section

↓

Trusted By / Statistics

↓

Features

↓

How It Works

↓

Why Choose MockMate AI

↓

Testimonials

↓

Frequently Asked Questions

↓

Final Call-to-Action

↓

Footer
```

Each section should occupy its own visual space with generous whitespace between sections.

---

# 4.5 Sticky Navigation Bar

## Purpose

Provide simple navigation while keeping the "Get Started" action visible at all times.

---

## Layout

### Left Side

Company Logo

MockMate AI

Clicking the logo should always return users to the Landing Page.

---

### Right Side

Navigation Links:

* Home
* Features
* How It Works
* About
* FAQ

Buttons:

Login

Get Started

The **Get Started** button should use the primary brand color (Indigo) and remain visually dominant.

---

## Behaviour

Scrolling down should shrink the navbar slightly and add a subtle shadow.

Navigation links should smoothly scroll to their respective sections.

The navbar should remain fixed to the top of the screen.

---

# 4.6 Hero Section

## Purpose

The Hero Section is the most important part of the Landing Page.

It should immediately answer:

> "Why should I use this product?"

---

## Layout

Desktop Layout:

```
----------------------------------------------
| Left (60%) | Right (40%) |
----------------------------------------------
```

---

### Left Side

#### Headline

Large bold headline.

Example:

> Ace Your Next Interview with AI-Powered Practice

Maximum 2 lines.

---

#### Subheading

Explain the platform in one short paragraph.

Example:

> Practice realistic technical and HR interviews, receive personalized AI feedback, track your improvement, and build confidence before your real interview.

---

#### CTA Buttons

Primary Button

Start Free Interview

Secondary Button

Watch Demo

---

#### Small Trust Indicators

Examples:

✓ Free to Start

✓ Personalized AI Feedback

✓ Placement Ready

---

### Right Side

Large illustration showing:

A student interacting with an AI interviewer.

Floating cards around the illustration:

* Interview Score
* AI Feedback
* Technical Round
* HR Round

Cards should have soft shadows and subtle floating animations.

---

# 4.7 Trusted By / Statistics Section

Purpose:

Build trust immediately after the Hero.

Display four statistics.

Example:

* 10,000+ Practice Sessions
* 500+ Interview Questions
* 95% User Satisfaction
* 24×7 AI Availability

Use large numbers with short descriptions.

---

# 4.8 Features Section

Purpose:

Explain the platform's key benefits.

Display six feature cards in a responsive grid.

Each card contains:

* Icon
* Title
* Two-line description

Suggested Features:

* AI Mock Interviews
* Technical Interviews
* HR Interviews
* Personalized Feedback
* Performance Analytics
* Interview History

Hovering over a card should slightly elevate it.

---

# 4.9 How It Works Section

Purpose:

Show how simple the product is.

Display a four-step timeline.

```
Create Account

↓

Choose Interview

↓

Answer Questions

↓

Receive AI Feedback
```

Each step should include:

* Icon
* Title
* Short description

---

# 4.10 Why Choose MockMate AI

Purpose:

Differentiate the platform.

Display comparison cards.

Traditional Preparation

vs

MockMate AI

Example comparisons:

* Reading Questions ❌ vs Practicing Interviews ✅
* No Feedback ❌ vs AI Feedback ✅
* Static Content ❌ vs Personalized Questions ✅
* No Progress Tracking ❌ vs Performance Analytics ✅

This section should visually reinforce the product's value.

---

# 4.11 Testimonials

Purpose:

Increase credibility.

Display three testimonial cards.

Each card includes:

* Avatar
* Name
* Role (e.g., Student)
* Short review
* Star rating

Cards should be horizontally aligned on desktop and stacked on mobile.

---

# 4.12 Frequently Asked Questions (FAQ)

Use an accordion layout.

Example questions:

* Is MockMate AI free?
* How does AI evaluate my answers?
* Can I practice technical interviews?
* Will my interview history be saved?
* Do I need coding knowledge?

Only one accordion item should be expanded at a time.

---

# 4.13 Final Call-to-Action

Purpose:

Give users one final opportunity to register.

Large centered section.

Headline:

> Ready to Crack Your Next Interview?

Description:

Encourage users to begin practicing.

Buttons:

* Start Free Interview
* Login

Use the primary brand color to make this section stand out.

---

# 4.14 Footer

Include:

Product

* Features
* Pricing (Coming Soon)
* Roadmap

Company

* About
* Contact

Legal

* Privacy Policy
* Terms & Conditions

Social Media

* LinkedIn
* GitHub

Footer should have a subtle contrasting background.

---

# 4.15 Responsive Behaviour

### Desktop

* Two-column hero layout.
* Six feature cards in three columns.
* Testimonials in a row.

### Tablet

* Hero columns slightly reduced.
* Feature cards in two columns.

### Mobile

* Single-column layout.
* Illustration below hero text.
* Full-width CTA buttons.
* Sidebar replaced by hamburger menu.

---

# 4.16 Animations

Animations should be subtle and purposeful.

Examples:

* Hero content fades in.
* Illustration slides in.
* Floating cards move gently.
* Buttons scale slightly on hover.
* Statistics count up when visible.
* Feature cards lift on hover.

Avoid flashy or distracting animations.

---

# 4.17 Empty States

The Landing Page has no data-dependent sections.

No empty states are required.

---

# 4.18 Accessibility

* Keyboard-accessible navigation.
* High color contrast.
* Alt text for illustrations.
* Visible focus indicators.
* Semantic HTML structure.

---

# 4.19 Acceptance Criteria

The Landing Page will be considered complete when:

* Users understand the product within 10 seconds.
* Primary CTA is visible without scrolling.
* Navigation works smoothly.
* Responsive layout functions correctly.
* Sections maintain consistent spacing.
* Buttons provide clear hover and focus feedback.
* Page loads quickly and feels polished.

---

# 4.20 Stitch Design Instructions

Generate a modern SaaS-style landing page for **MockMate AI**.

The design should use a light theme with Indigo (#4F46E5) as the primary color, Purple (#7C3AED) as the secondary accent, and a soft off-white background (#F8FAFC). Use Poppins for headings and Inter for body text.

Create a responsive layout with a sticky navigation bar, a two-column hero section, feature cards, statistics, a "How It Works" timeline, comparison section, testimonials, FAQ accordion, final call-to-action, and a structured footer.

The overall experience should feel premium, trustworthy, and approachable, similar to products like Linear or Vercel. Use generous whitespace, rounded cards, subtle shadows, and smooth animations to reinforce a clean, modern SaaS identity.

---

# Chapter Summary

The Landing Page is designed to convert visitors into users by clearly communicating the product's value, building trust, and guiding them toward creating an account. It should serve as a strong first impression of MockMate AI and establish the visual and interaction patterns that continue throughout the application.
# Chapter 5 – Authentication (Login & Signup)

# MockMate AI – Frontend Product Requirement Document

---

# 5.1 Purpose of Authentication

Authentication is the user's first interaction after deciding to use MockMate AI.

The goal of this experience is **not only to let users log in**, but to make the process feel simple, secure, and welcoming.

The authentication flow should reduce friction, encourage account creation, and quickly guide users toward starting their first mock interview.

The entire process—from opening the Login page to reaching the Dashboard—should take less than two minutes.

---

# 5.2 Authentication Flow

### New User Journey

Landing Page

↓

Click **Get Started**

↓

Signup Page

↓

Create Account

↓

Account Created Successfully

↓

Welcome Screen (Optional)

↓

Dashboard

---

### Existing User Journey

Landing Page

↓

Click **Login**

↓

Login Page

↓

Dashboard

---

### Forgot Password Journey

Login

↓

Forgot Password

↓

Enter Email

↓

Verification Sent

↓

Reset Password

↓

Login Again

---

# 5.3 Authentication Design Philosophy

The authentication pages should feel:

* Simple
* Friendly
* Secure
* Professional

Avoid overwhelming users with unnecessary fields or distractions.

The focus should remain entirely on completing authentication.

Navigation should be minimal.

---

# 5.4 Shared Page Layout

Both Login and Signup pages should use the same layout to maintain consistency.

## Desktop Layout

Split Screen

```text
----------------------------------------------------
| Illustration (45%) | Authentication Card (55%) |
----------------------------------------------------
```

### Left Section

Purpose:

Create an emotional connection with the product.

Contents:

* Large modern illustration of a student participating in an AI interview.
* Floating UI cards showing:

  * AI Feedback
  * Technical Interview
  * 92% Score
  * Progress Tracking
* Short motivational quote.

Example:

> "Practice today. Impress tomorrow."

Background should use subtle gradients based on the primary brand colors.

---

### Right Section

Contains a centered authentication card.

The card should have:

* Product Logo
* Welcome Message
* Authentication Form
* Social Login
* Navigation Links

Maximum width:

480px

Rounded corners:

20px

Soft shadow.

---

# 5.5 Login Page Specification

## Purpose

Allow existing users to securely access their dashboard with minimum effort.

---

## Header

Display:

Logo

Application Name

Title

> Welcome Back

Subtitle

> Continue your interview preparation journey.

---

## Form Components

1. Email Address

Placeholder:

[you@example.com](mailto:you@example.com)

Validation:

* Required
* Valid email format

---

2. Password

Placeholder:

Enter your password

Features:

* Show/Hide Password icon
* Minimum length validation
* Password hidden by default

---

3. Remember Me

Checkbox

Purpose:

Keep users signed in on trusted devices.

---

4. Forgot Password

Text link aligned to the right.

Opens password recovery flow.

---

5. Login Button

Primary Indigo button.

Text:

Login

Loading state:

Replace text with spinner and:

"Signing In..."

Button disabled while processing.

---

6. Divider

Text:

OR

---

7. Continue with Google

Large outlined button.

Google icon on the left.

Should match the width of the Login button.

---

8. Signup Link

Text:

Don't have an account?

Create Account

The "Create Account" link should be highlighted using the primary color.

---

# 5.6 Login Validation

Display inline validation below each field.

Examples:

Email

> Please enter a valid email address.

Password

> Password cannot be empty.

Never display technical error messages.

---

# 5.7 Login Error States

Examples:

Incorrect Email

Incorrect Password

Server Unavailable

Expired Session

Each error should include:

* Friendly explanation.
* Retry option if appropriate.

Example:

> We couldn't sign you in. Please check your email and password and try again.

---

# 5.8 Login Loading State

During login:

Disable all inputs.

Show loading spinner inside the Login button.

Display message:

> Signing you in...

The loading animation should be subtle and last only while waiting for the response.

---

# 5.9 Successful Login

After successful authentication:

Display a brief success animation (optional).

Redirect users to the Dashboard.

For first-time users, show a welcome banner:

> Welcome to MockMate AI! Let's start your first interview.

---

# 5.10 Signup Page Specification

## Purpose

Allow new users to create an account quickly.

The signup form should ask only for the information required to get started.

Avoid lengthy registration forms.

---

## Header

Title

> Create Your Account

Subtitle

> Start practicing smarter with AI-powered interviews.

---

## Form Components

1. Full Name

Placeholder:

Enter your full name

---

2. Email Address

Validation:

* Required
* Valid email format

---

3. Password

Validation:

* Minimum 8 characters
* At least one uppercase letter
* At least one number

Display password strength indicator.

Levels:

Weak

Medium

Strong

---

4. Confirm Password

Ensure both passwords match.

Display immediate validation.

---

5. Terms & Conditions

Checkbox

Text:

I agree to the Terms and Privacy Policy.

Signup should not proceed until accepted.

---

6. Create Account Button

Primary button.

Text:

Create Account

Loading state:

Creating Account...

---

7. Continue with Google

Same style as Login.

---

8. Login Link

Already have an account?

Login

---

# 5.11 Signup Validation

Display validation in real time.

Users should know exactly what needs to be corrected.

Avoid showing all errors at once before interaction.

---

# 5.12 Password UX

Requirements:

* Eye icon to show/hide password.
* Strength meter.
* Checklist updates live.

Example:

✔ 8 characters

✔ One uppercase letter

✔ One number

This helps users create secure passwords without frustration.

---

# 5.13 Empty States

Authentication pages do not contain data-dependent empty states.

Instead, provide clear placeholder text in every field.

---

# 5.14 Responsive Behaviour

## Desktop

Split-screen layout.

Illustration visible.

Centered authentication card.

---

## Tablet

Illustration reduced in size.

Authentication card occupies more space.

---

## Mobile

Remove the illustration.

Center the authentication card vertically.

Buttons should span the full width.

Inputs should be easy to tap.

---

# 5.15 Accessibility

Requirements:

* Keyboard navigation.
* Visible focus indicators.
* Labels associated with all inputs.
* Error messages announced to screen readers.
* Sufficient color contrast.

Do not rely on color alone to indicate validation errors.

---

# 5.16 Micro-interactions

* Input border highlights on focus.
* Buttons slightly scale on hover.
* Password visibility icon animates smoothly.
* Success message fades in after account creation.
* Validation icons appear with subtle transitions.

Animations should remain under 300ms.

---

# 5.17 Acceptance Criteria

Authentication will be considered complete when:

* Users can create an account in under two minutes.
* Login and Signup share a consistent visual style.
* Validation is clear and immediate.
* Error messages are user-friendly.
* Mobile layout is fully responsive.
* Authentication feels fast and polished.

---

# 5.18 Stitch Design Instructions

Generate two authentication screens (Login and Signup) using a shared modern SaaS design language.

Both screens should feature a split-screen desktop layout with an illustration on the left and a centered authentication card on the right. Use Indigo (#4F46E5) as the primary color, soft shadows, rounded corners (20px), and generous spacing.

Include real-time validation, password visibility toggle, password strength indicator (Signup), social login buttons, loading states, and clear error messaging.

On mobile devices, remove the illustration and display a clean, centered authentication card with full-width inputs and buttons.

The authentication experience should feel welcoming, secure, and production-ready rather than like a basic form.

---

# Chapter Summary

The Authentication module serves as the gateway to MockMate AI. It should provide a smooth, low-friction experience that encourages users to sign up, reassures them during login, and transitions them quickly into the core interview experience. Every interaction—from input validation to loading states—should reinforce the application's modern, supportive, and professional identity.
Chapter 6 – Dashboard PRD
MockMate AI
Purpose
Dashboard is the interview command center providing progress, guidance and quick actions.
Goals
Welcome user, summarize progress, recommend next interview, motivate practice, provide analytics.
Layout
Sticky top bar, fixed sidebar, responsive main grid: Welcome, Stats, Quick Actions, AI Recommendation, Analytics, Recent Interviews, Achievements, Tips.
Sidebar
Dashboard, Start Interview, History, Analytics, Profile, Settings, Logout. Active indigo state.
Top Bar
Title, notifications, profile, future search.
Welcome Banner
Greeting, motivation, Start Interview CTA, View Progress CTA, AI illustration.
Statistics
Cards: Completed Interviews, Average Score, Streak, Practice Hours with trends.
Quick Actions
Start Interview, Resume Interview (coming soon), Coding Interview (coming soon).
AI Recommendation
Personalized next interview with reason and CTA.
Analytics
Line chart, radar chart, weekly activity, confidence indicator.
Recent Interviews
Searchable history cards/table with View Report.
Achievements
Unlocked and locked badges.
Learning Tips
Daily AI suggestions.
Notifications
Reminder center.
Loading/Empty/Error
Skeletons, friendly empty states, retry messages.
Responsive & Accessibility
Drawer on mobile, stacked cards, keyboard navigation, focus states.
Stitch Prompt
Create a modern SaaS dashboard with Indigo theme, rounded cards, charts, AI recommendation, responsive React+Tailwind layout.
# Chapter 7 – Interview Setup Page Specification

# MockMate AI – Frontend Product Requirement Document

---

# 7.1 Purpose of the Interview Setup Page

The Interview Setup page acts as the bridge between the Dashboard and the Live Interview.

Its purpose is to help users configure a personalized interview experience based on their goals, skills, and available time.

This page should feel like preparing for a real interview rather than filling out a form.

The setup process should be quick (under 60 seconds), intuitive, and motivating.

Users should feel excited to begin their interview, not overwhelmed by too many options.

---

# 7.2 Primary Goals

The page should allow users to:

* Select the interview category.
* Choose the target job role.
* Pick the interview difficulty.
* Choose interview duration.
* Select question language.
* Enable voice interview (future feature).
* Upload a resume (optional for personalized interviews).
* Review interview settings.
* Start the interview.

---

# 7.3 User Journey

Dashboard

↓

Click **Start Interview**

↓

Interview Setup

↓

Configure Interview

↓

Review Settings

↓

Start Interview

↓

Loading Screen

↓

Live Interview

---

# 7.4 Page Layout

Desktop Layout

```text
----------------------------------------------------
Top Navigation
----------------------------------------------------

Page Title

Progress Indicator

----------------------------------------------------

Interview Configuration Card

----------------------------------------------------

Resume Upload Card

----------------------------------------------------

Interview Summary

----------------------------------------------------

Start Interview Button
```

All content should be displayed in a single scrollable page with generous spacing.

---

# 7.5 Page Header

### Title

Start Your Mock Interview

### Subtitle

Customize your interview experience before you begin.

Right Side

Estimated Setup Time

"Less than 1 minute"

---

# 7.6 Interview Type Selection

Purpose

Allow users to choose the interview category.

Display as large cards.

Cards:

• Technical Interview

• HR Interview

• Mixed Interview

Future:

• Coding Interview

• Resume-Based Interview

Each card contains:

* Icon
* Title
* Short description
* Estimated duration

Selected card should display:

* Indigo border
* Soft shadow
* Checkmark icon

Only one option may be selected.

---

# 7.7 Job Role Selection

Title

Choose Your Target Role

Display as searchable dropdown.

Suggested Roles

* Frontend Developer
* Backend Developer
* Full Stack Developer
* Software Engineer
* Data Analyst
* AI/ML Engineer
* DevOps Engineer

Future versions should support custom job roles.

---

# 7.8 Difficulty Level

Title

Interview Difficulty

Options

Beginner

Intermediate

Advanced

Display as segmented control.

Each option includes:

* Label
* Short explanation

Example

Beginner

Suitable for first-time interview practice.

---

# 7.9 Interview Duration

Display duration cards.

Options

10 Minutes

20 Minutes

30 Minutes

45 Minutes

60 Minutes

Each card displays:

* Clock icon
* Duration
* Approximate number of questions

Example

20 Minutes

~8 Questions

---

# 7.10 Language Selection

Dropdown

Default

English

Future

Hindi

Marathi

Other regional languages

---

# 7.11 Resume Upload (Optional)

Purpose

Allow users to upload their resume for personalized interviews.

Card includes:

Upload Area

Supported formats:

PDF

DOCX

Maximum size:

5 MB

After upload:

Display

* File name
* File size
* Remove button

If no file is uploaded:

Display illustration and message:

"Upload your resume for more personalized interview questions."

---

# 7.12 Interview Summary Card

Purpose

Allow users to review all selected settings before starting.

Display:

Interview Type

Job Role

Difficulty

Duration

Language

Resume Status

Estimated Questions

This card updates dynamically as users change selections.

---

# 7.13 Primary Action

Large button

Start Interview

Button should span the width of the configuration card.

Hover:

Slight elevation

Click:

Loading animation

---

# 7.14 Validation

Users cannot start the interview until:

✓ Interview Type selected

✓ Job Role selected

✓ Difficulty selected

✓ Duration selected

If validation fails:

Highlight missing fields.

Display inline guidance.

---

# 7.15 Loading State

After clicking Start Interview:

Disable all controls.

Display loading screen.

Animation:

AI avatar preparing.

Message:

"Preparing your AI interviewer..."

Progress indicator:

0–100%

Estimated time:

3–5 seconds

---

# 7.16 Empty States

If no job roles are available:

Display:

"No job roles found."

Provide search suggestions.

---

# 7.17 Error States

If interview generation fails:

Display:

"We couldn't prepare your interview right now."

Buttons:

Retry

Return to Dashboard

Avoid technical language.

---

# 7.18 Micro-interactions

* Cards elevate on hover.
* Selected options animate smoothly.
* Progress indicator fills gradually.
* Upload area highlights during drag-and-drop.
* Start button pulses subtly after all required fields are complete.

---

# 7.19 Responsive Behaviour

Desktop

Two-column layout for larger cards.

Tablet

Single-column layout with reduced spacing.

Mobile

Full-width cards.

Bottom sticky "Start Interview" button.

Dropdowns optimized for touch.

---

# 7.20 Accessibility

* Keyboard navigation for all options.
* Labels for every form element.
* High color contrast.
* Drag-and-drop upload also supports file browsing.
* Focus indicators visible on interactive elements.

---

# 7.21 Acceptance Criteria

The Interview Setup page is considered complete when:

* Users can configure an interview in under one minute.
* Required fields are validated clearly.
* Selected options are easy to review.
* Resume upload is optional and intuitive.
* Mobile and desktop layouts provide the same functionality.
* Starting an interview feels fast and seamless.

---

# 7.22 Stitch Design Instructions

Generate a modern SaaS-style Interview Setup page using the MockMate AI design system.

The page should feature a clean, card-based layout with large selectable interview type cards, searchable job role dropdown, segmented difficulty selector, duration cards, optional resume upload area, dynamic interview summary card, and a prominent full-width "Start Interview" button.

Use Indigo (#4F46E5) as the primary color, rounded 16px cards, generous whitespace, subtle hover animations, and responsive layouts. The experience should feel like preparing for a professional interview rather than completing a form.

---

# Chapter Summary

The Interview Setup page prepares users for a personalized mock interview. It should make configuration effortless, reduce decision fatigue, and build excitement before the interview begins. Every interaction should reinforce the feeling that the user is about to enter a realistic, AI-powered interview experience.
# Chapter 8 – Live Interview Experience

# MockMate AI – Frontend Product Requirement Document

---

# 8.1 Purpose

The Live Interview page is the heart of MockMate AI.

This page simulates a real interview environment where the user interacts with an AI interviewer. Unlike a quiz application, users should feel as if they are speaking to an interviewer in a professional interview room.

The interface should remain distraction-free, helping users focus on answering questions confidently.

The page must support text-based interviews in Version 1 while being designed to accommodate voice interviews, webcam analysis, and coding interviews in future releases.

---

# 8.2 User Goals

When users enter this page, they should be able to:

* Read interview questions clearly.
* Answer without distractions.
* Track interview progress.
* View remaining time.
* Navigate between questions when allowed.
* Submit answers confidently.
* End the interview when finished.

The interface should reduce stress and improve focus.

---

# 8.3 User Journey

```text
Dashboard
      ↓
Interview Setup
      ↓
Loading AI Interview
      ↓
Live Interview
      ↓
AI Analysis
```

---

# 8.4 Layout Structure

Desktop Layout

```text
-------------------------------------------------------
Top Progress Bar
-------------------------------------------------------

Question Panel (70%) | AI Assistant Panel (30%)

-------------------------------------------------------

Answer Editor

-------------------------------------------------------

Bottom Action Bar
```

The layout should feel spacious and balanced.

---

# 8.5 Top Progress Section

Purpose:

Provide awareness without distracting users.

Include:

* Interview Title
* Question Number
* Progress Bar
* Remaining Time
* Exit Interview button

Example

```
Frontend Developer Interview

Question 4 of 10

████████░░

08:45 Remaining
```

The progress bar should animate smoothly after each submitted answer.

---

# 8.6 AI Interviewer Panel

Position:

Right side of desktop layout.

Purpose:

Create the feeling of interacting with a real interviewer.

Components:

* AI Avatar
* Interview Status
* Current Interview Type
* AI Thinking Indicator
* Interview Tips

Example Status

🟢 Listening

🟡 Generating Next Question

🔵 Evaluating Response

The avatar should use subtle animations rather than exaggerated expressions.

---

# 8.7 Question Card

Purpose

Present the current interview question clearly.

Layout

Large rounded card.

Contents:

* Question Number
* Difficulty Badge
* Category Badge
* Main Question
* Optional Hint Button
* Estimated Answer Time

Example

Question 5

Difficulty: Intermediate

Category: React

Question:

Explain the Virtual DOM and why React uses it.

Hint Button (Optional)

Reveal Hint

Hints should not reveal the answer directly.

---

# 8.8 Answer Section

Version 1

Large multiline text editor.

Features

Placeholder

"Type your answer here..."

Character Counter

Auto Save every few seconds

Resizable area

Clear formatting

Future

Voice Input

Speech-to-Text

Rich text support

The editor should always remain visible while reading the question.

---

# 8.9 AI Writing Assistant (Future)

This panel remains disabled in Version 1.

Future features include:

Grammar suggestions

Communication improvements

Filler word detection

Speaking confidence

A "Coming Soon" badge should indicate these future capabilities.

---

# 8.10 Bottom Action Bar

Primary Actions

Submit Answer

Next Question

Secondary Actions

Skip Question

Save & Exit

End Interview

The "Submit Answer" button should be visually dominant.

Buttons should be spaced to avoid accidental clicks.

---

# 8.11 Timer

Purpose

Help users manage time realistically.

Display

Countdown timer.

Warning states:

Yellow when less than 2 minutes remain.

Red when less than 30 seconds remain.

The timer should never flash aggressively.

---

# 8.12 Keyboard Shortcuts

To improve productivity:

Ctrl + Enter → Submit Answer

Tab → Move through controls

Esc → Open Exit Confirmation

Keyboard shortcuts should be displayed in a help tooltip.

---

# 8.13 Exit Confirmation

If users attempt to leave:

Display modal.

Message

"Are you sure you want to end your interview?"

Buttons

Continue Interview

End Interview

Explain that unanswered questions may affect the final score.

---

# 8.14 Loading States

While AI prepares the next question:

Disable the answer editor.

Display animated placeholder.

Message

"Generating your next interview question..."

The transition should feel smooth and professional.

---

# 8.15 Empty States

If the interview has not started:

Display

AI illustration

Message

"Your interview will begin shortly."

If no questions are available:

Display

"We couldn't generate questions at the moment."

Retry Button

---

# 8.16 Error States

Examples

Network interruption

AI response timeout

Autosave failure

Display friendly banners.

Allow users to retry without losing answers.

---

# 8.17 Micro-interactions

* Progress bar animates after every answer.
* AI avatar subtly changes status.
* Submit button scales slightly on hover.
* Question card fades smoothly between questions.
* Timer transitions gently between colors.
* Toast notification confirms autosave.

Animations should remain under 300ms.

---

# 8.18 Responsive Behaviour

Desktop

Two-column layout.

Tablet

Question panel expands.

AI panel becomes collapsible.

Mobile

Single-column layout.

Question at top.

Answer editor below.

Sticky bottom action bar.

Progress remains visible while scrolling.

---

# 8.19 Accessibility

* Full keyboard navigation.
* Screen-reader friendly question announcements.
* High contrast timer colors.
* Visible focus indicators.
* Large touch targets on mobile.

---

# 8.20 Acceptance Criteria

The Live Interview page is complete when:

* Users always know which question they are answering.
* Progress and remaining time are clearly visible.
* Answer submission feels immediate.
* No user data is lost during interruptions.
* Mobile and desktop experiences are equally usable.
* The interface creates the feeling of a real interview rather than an examination form.

---

# 8.21 Stitch Design Instructions

Generate a modern SaaS-style Live Interview interface using the MockMate AI design system.

Use a distraction-free layout with a sticky top progress bar, large question card, spacious answer editor, AI interviewer panel on desktop, responsive single-column layout on mobile, rounded 16px cards, Indigo (#4F46E5) as the primary color, subtle shadows, Lucide icons, and smooth transitions.

Ensure the "Submit Answer" button is the primary action, the timer is always visible, and the interface feels calm, professional, and focused. Design with future support for voice interviews and webcam analysis without changing the overall layout.

---

# Chapter Summary

The Live Interview page is the defining experience of MockMate AI. It should simulate a realistic interview while remaining simple, intuitive, and distraction-free. Every component—from the AI avatar to the progress bar—should reinforce the feeling that the user is practicing with a professional interview coach rather than completing a traditional online test.
# Chapter 9 – AI Analysis Page Specification

# MockMate AI – Frontend Product Requirement Document

---

# 9.1 Purpose of the AI Analysis Page

The AI Analysis page is responsible for processing the completed interview and presenting users with meaningful feedback.

Unlike a traditional result page that simply displays a score, this page should make users feel that an intelligent mentor has carefully evaluated their performance.

The analysis should focus on helping users improve rather than judging them.

The page should answer five key questions:

* How did I perform?
* What did I do well?
* Where did I make mistakes?
* How can I improve?
* What should I practice next?

The overall experience should feel encouraging, personalized, and insightful.

---

# 9.2 User Journey

```text
Live Interview
        ↓
Submit Final Answer
        ↓
AI Processing
        ↓
AI Analysis
        ↓
Detailed Results
```

---

# 9.3 Primary Goals

The page should:

* Show that AI is analyzing responses.
* Keep users engaged while waiting.
* Explain what is being analyzed.
* Build anticipation before the final score.
* Reassure users that every answer is being evaluated fairly.

---

# 9.4 Layout Structure

Desktop Layout

```text
--------------------------------------------------
Top Navigation
--------------------------------------------------

AI Analysis Header

↓

Analysis Progress Card

↓

Real-Time Processing Timeline

↓

Skill Evaluation Preview

↓

Motivational Message
```

The page should avoid showing blank loading screens.

Users should always see visible progress.

---

# 9.5 Analysis Header

### Title

Analyzing Your Interview

### Subtitle

Our AI is reviewing your responses and preparing detailed feedback.

Right Side

Animated AI Illustration

The illustration should represent an intelligent assistant reviewing interview responses.

---

# 9.6 AI Processing Card

Large centered card.

Contents:

* Circular progress indicator
* Current progress percentage
* Estimated remaining time
* Current AI activity

Example

Progress

72%

Estimated Time

15 Seconds Remaining

Current Task

Analyzing Communication Skills...

The progress animation should move smoothly.

---

# 9.7 Processing Timeline

Purpose

Help users understand what AI is doing.

Display as a vertical timeline.

Example

✔ Interview Completed

✔ Answers Saved

✔ Technical Evaluation

⏳ Communication Analysis

⏳ Confidence Assessment

⏳ Final Score Generation

Completed steps show green checkmarks.

Current step displays an animated loader.

Upcoming steps remain inactive.

---

# 9.8 Skill Evaluation Preview

Display preview cards for the skills being analyzed.

Cards include:

* Technical Knowledge
* Communication
* Problem Solving
* Confidence
* Clarity
* Time Management

Each card shows:

* Skill Icon
* Skill Name
* Animated "Analyzing..." label

Do not display final scores yet.

---

# 9.9 AI Thinking Messages

To make waiting feel productive, rotate friendly AI messages.

Examples:

"Reviewing your technical concepts..."

"Checking communication clarity..."

"Comparing your answers with industry standards..."

"Preparing personalized recommendations..."

Display a new message every 3–5 seconds.

---

# 9.10 Motivational Section

At the bottom of the page, display an encouraging message.

Example

> Every interview is an opportunity to learn. Your personalized report is almost ready!

Include a small AI mascot or illustration.

---

# 9.11 Loading Behaviour

The analysis should never appear frozen.

Requirements:

* Animated progress bar.
* Circular progress indicator.
* Rotating AI messages.
* Timeline updates.
* Smooth transitions.

If backend processing is very fast, display the analysis screen for at least 2–3 seconds to avoid abrupt transitions.

---

# 9.12 Error States

If AI analysis fails:

Display a centered card.

Message

"We couldn't complete your interview analysis right now."

Buttons

Retry Analysis

Return to Dashboard

If partial data exists, preserve it and continue from the last successful step.

---

# 9.13 Empty States

Normally this page should never appear without interview data.

If accessed directly:

Display illustration.

Message

"No interview data available."

Button

Go to Dashboard

---

# 9.14 Micro-interactions

* Circular progress animates smoothly.
* Timeline items transition from pending to completed.
* Skill cards pulse gently while being analyzed.
* AI illustration has subtle floating animation.
* Success checkmarks animate when a step completes.

All animations should remain subtle (200–300ms).

---

# 9.15 Responsive Behaviour

Desktop

Centered analysis card with vertical timeline beside it.

Tablet

Timeline moves below the progress card.

Mobile

Single-column layout.

Progress indicator at top.

Timeline below.

Skill cards displayed in two columns.

Buttons become full width.

---

# 9.16 Accessibility

* Progress values announced to screen readers.
* Timeline updates accessible via ARIA live regions.
* High contrast indicators.
* Keyboard navigation supported.
* Avoid relying on color alone to show status.

---

# 9.17 Acceptance Criteria

The AI Analysis page is considered complete when:

* Users always know the current analysis status.
* Waiting feels engaging rather than frustrating.
* Progress updates are visible.
* Errors are handled gracefully.
* The transition to the Results page feels smooth and rewarding.

---

# 9.18 Stitch Design Instructions

Generate a modern AI Analysis page using the MockMate AI design system.

The page should feature a large animated circular progress indicator, a real-time processing timeline, animated skill analysis cards, rotating AI thinking messages, and an encouraging motivational section.

Use Indigo (#4F46E5) as the primary color with soft gradients, rounded 16px cards, subtle shadows, generous whitespace, and responsive layouts. The experience should feel intelligent, reassuring, and polished, building anticipation before revealing the final interview results.

---

# Chapter Summary

The AI Analysis page transforms the waiting period into an engaging experience by showing users exactly how their interview is being evaluated. Instead of presenting a blank loading screen, it communicates transparency, intelligence, and encouragement. This creates trust in the AI system and makes the transition to the Results page more meaningful.
# Chapter 10 – Interview Results & AI Feedback

# MockMate AI – Frontend Product Requirement Document

---

# 10.1 Purpose of the Results Page

The Results page presents a complete evaluation of the user's interview performance.

Instead of showing only a numerical score, this page should provide a detailed, personalized report that helps users understand:

* Overall interview performance
* Individual skill strengths
* Areas requiring improvement
* AI-generated recommendations
* Progress compared to previous interviews
* Action plan for the next interview

The experience should feel motivating, educational, and encouraging.

Users should leave the page feeling:

"I know exactly how to improve before my next interview."

---

# 10.2 User Journey

```text
Dashboard
      ↓
Interview Setup
      ↓
Live Interview
      ↓
AI Analysis
      ↓
Interview Results
      ↓
Dashboard / Retry Interview / View History
```

---

# 10.3 Primary Goals

The Results page should:

* Display interview performance clearly.
* Celebrate achievements.
* Explain mistakes constructively.
* Suggest personalized next steps.
* Encourage continuous practice.

---

# 10.4 Layout Structure

Desktop Layout

```text
---------------------------------------------------
Top Navigation
---------------------------------------------------

Interview Summary Banner

↓

Overall Performance Score

↓

Skill Breakdown

↓

Strengths & Weaknesses

↓

Question-wise Feedback

↓

AI Recommendations

↓

Performance Comparison

↓

Next Steps

↓

Action Buttons
```

The page should feel like a professional performance review.

---

# 10.5 Interview Summary Banner

Purpose

Provide a quick overview.

Contents

* Job Role
* Interview Type
* Difficulty
* Date & Time
* Duration
* Questions Answered

Example

Frontend Developer

Technical Interview

Intermediate

20 Minutes

10 Questions

Completed Today

Right Side

Interview Status

✓ Completed Successfully

---

# 10.6 Overall Performance Score

Purpose

Highlight the user's overall result.

Display

Large circular score indicator.

Example

86%

Label

Excellent Performance

Include

Performance Level

Outstanding

Good

Average

Needs Improvement

Display percentile (future feature).

Example

Top 15% of users

---

# 10.7 Skill Breakdown

Display six skill cards.

Each card includes

* Skill Name
* Score
* Progress Bar
* Short AI Comment

Skills

Technical Knowledge

Communication

Problem Solving

Confidence

Time Management

Professionalism

Example

Communication

78%

"Your explanations were clear but could be more concise."

Cards should use color coding.

Green

Excellent

Yellow

Average

Red

Needs Improvement

---

# 10.8 Strengths

Display 3–5 strengths.

Example

✔ Strong React knowledge

✔ Confident communication

✔ Logical thinking

Each strength displayed in a green success card.

---

# 10.9 Areas for Improvement

Display improvement suggestions.

Examples

Improve answer structure.

Use more real-world examples.

Reduce filler words.

Manage interview time better.

Each suggestion includes

Issue

Reason

Recommended Practice

---

# 10.10 Question-wise Feedback

Purpose

Allow users to review every interview question.

Accordion layout.

Each item includes

Question

User Answer Summary

Ideal Answer Summary

AI Feedback

Score

Time Taken

Users can expand one question at a time.

Future Feature

Replay voice answer.

---

# 10.11 AI Recommendations

Purpose

Provide actionable advice.

Examples

Practice React Hooks.

Improve behavioral storytelling.

Revise JavaScript closures.

Take an Advanced HR interview next.

Each recommendation card includes

Priority

Estimated Practice Time

Start Practice button

---

# 10.12 Performance Comparison

Purpose

Show improvement over time.

Charts

Line Chart

Average Score Trend

Bar Chart

Skill Comparison

Display

Current Interview

Previous Interview

Best Performance

Example

Communication

Previous

70%

Current

82%

Improvement

+12%

---

# 10.13 AI Confidence Summary

Display a short paragraph.

Example

> Based on this interview, you are well prepared for entry-level Frontend Developer interviews. Improving communication clarity and providing more practical examples will significantly increase your interview performance.

This section should feel like advice from a mentor.

---

# 10.14 Interview Recording (Future)

Placeholder Card

Coming Soon

Users will later be able to

Review voice recording

Replay answers

Analyze speaking pace

Analyze confidence

---

# 10.15 Share Achievement

Allow users to

Download PDF Report

Share Score (LinkedIn)

Copy Report Link

These features encourage engagement.

---

# 10.16 Action Section

Display three prominent buttons.

Primary

Start Another Interview

Secondary

View Interview History

Outline

Return to Dashboard

Primary button should be visually dominant.

---

# 10.17 Empty State

If no report exists

Display illustration.

Message

"No interview report available."

Button

Start Your First Interview

---

# 10.18 Error State

If report generation fails

Message

"We couldn't generate your report."

Buttons

Retry

Dashboard

Never display technical errors.

---

# 10.19 Micro-interactions

* Score circle animates from 0 to final score.
* Progress bars fill smoothly.
* Skill cards animate into view.
* Charts fade in.
* Accordion expands smoothly.
* Success cards slide upward.

Animations should remain subtle and professional.

---

# 10.20 Responsive Behaviour

Desktop

Multi-column layout.

Tablet

Two-column skill cards.

Mobile

Single-column layout.

Charts become scrollable.

Buttons become full width.

Accordion optimized for touch.

---

# 10.21 Accessibility

* Keyboard-accessible accordion.
* Screen-reader support for charts.
* High-contrast progress indicators.
* Focus states on all buttons.
* Text alternatives for graphical score displays.

---

# 10.22 Acceptance Criteria

The Results page is complete when:

* Users understand their overall performance within 15 seconds.
* Strengths and weaknesses are easy to identify.
* Recommendations are actionable.
* Charts display historical progress.
* Reports remain readable on all screen sizes.
* Users are encouraged to continue practicing.

---

# 10.23 Stitch Design Instructions

Generate a premium SaaS-style Results page using the MockMate AI design system.

Include:

* Interview Summary Banner
* Large circular overall score
* Skill score cards
* Animated progress bars
* Strengths & Weaknesses cards
* Expandable question-wise feedback
* AI Recommendations
* Performance comparison charts
* Three clear action buttons

Use Indigo (#4F46E5) as the primary color, rounded 16px cards, generous spacing, soft shadows, Lucide icons, and smooth animations. The interface should feel like a professional performance review rather than an exam result.

---

# Chapter Summary

The Results page is the culmination of the MockMate AI experience. It transforms interview responses into clear, personalized guidance that helps users improve. By combining visual analytics, AI insights, and actionable recommendations, the page encourages continuous learning and repeated interview practice.
# Chapter 11 – Interview History Page Specification

# MockMate AI – Frontend Product Requirement Document

---

# 11.1 Purpose of the Interview History Page

The Interview History page serves as the user's complete archive of all mock interviews conducted on the platform.

Its purpose is not only to store previous interviews but also to allow users to track long-term progress, revisit AI feedback, compare performances, and identify improvement trends.

The page should help users answer the following questions:

* How many interviews have I completed?
* Am I improving over time?
* Which interview was my best?
* Which skills need more practice?
* Can I review my previous AI feedback?

The experience should feel like a personal career journal rather than a simple history list.

---

# 11.2 User Journey

```text
Dashboard
        ↓
Interview History
        ↓
Browse Interviews
        ↓
Open Interview Report
        ↓
View Detailed Results
        ↓
Retry Similar Interview
```

---

# 11.3 Primary Goals

The page should enable users to:

* View all completed interviews.
* Search previous interviews.
* Filter interviews by category.
* Sort interviews.
* View interview reports.
* Compare performances.
* Restart similar interviews.
* Download reports (future).

---

# 11.4 Layout Structure

Desktop Layout

```text
---------------------------------------------------
Top Navigation
---------------------------------------------------

History Summary

↓

Search + Filters

↓

Interview Timeline / Cards

↓

Pagination
```

The layout should prioritize readability over information density.

---

# 11.5 History Summary Section

Display four summary cards.

Card 1

Total Interviews

Example

42

---

Card 2

Average Score

84%

---

Card 3

Best Performance

96%

---

Card 4

Practice Streak

12 Days

Each card includes:

* Icon
* Value
* Short description
* Trend indicator

---

# 11.6 Search & Filter Section

Provide users with tools to quickly locate interviews.

Search Box

Placeholder

Search by role, interview type, or date...

Filters

* Technical
* HR
* Mixed
* Coding (Future)

Difficulty

* Beginner
* Intermediate
* Advanced

Date Range

* Today
* Last Week
* Last Month
* Custom Range

Sort Options

* Latest First
* Oldest First
* Highest Score
* Lowest Score

Filters should update results instantly.

---

# 11.7 Interview History Cards

Each completed interview appears as an individual card.

Each card contains:

* Job Role
* Interview Type
* Difficulty
* Interview Date
* Duration
* Overall Score
* Status Badge
* Action Buttons

Example

Frontend Developer

Technical Interview

Intermediate

Score

86%

Completed

20 Minutes

Buttons

View Report

Retry Interview

Cards should have soft shadows and rounded corners.

---

# 11.8 Timeline View (Optional Toggle)

Users can switch between:

* Card View
* Timeline View

Timeline View displays interviews chronologically.

Example

Jan 10

Frontend Interview

↓

Jan 18

React Interview

↓

Jan 25

HR Interview

This provides a visual representation of growth.

---

# 11.9 Quick Performance Indicators

Each interview card should include:

Score Badge

Confidence Indicator

Improvement Compared to Previous Interview

Example

↑ +8%

This gives users immediate insight without opening the report.

---

# 11.10 View Report

Clicking **View Report** opens the detailed Results page.

The transition should preserve context and load the selected interview report.

---

# 11.11 Retry Interview

Users can quickly restart a similar interview.

The setup page should automatically prefill:

* Job Role
* Interview Type
* Difficulty
* Duration

Users may edit these settings before starting.

---

# 11.12 Empty State

If the user has never completed an interview:

Display illustration.

Message

> You haven't completed any interviews yet.

Primary Button

Start Your First Interview

Secondary Text

Your completed interviews and AI reports will appear here.

---

# 11.13 Error State

If history cannot be loaded:

Display centered card.

Message

We couldn't load your interview history.

Buttons

Retry

Return to Dashboard

Avoid exposing technical error details.

---

# 11.14 Loading State

While interview history loads:

* Skeleton cards
* Placeholder summary cards
* Animated search bar placeholder

The page should avoid abrupt layout shifts.

---

# 11.15 Micro-interactions

* Cards elevate slightly on hover.
* Score badges animate into view.
* Filters transition smoothly.
* Timeline expands with fade animation.
* Search results update instantly.
* Toast notification appears after restarting an interview.

Animations should remain under 300ms.

---

# 11.16 Responsive Behaviour

Desktop

Four summary cards in one row.

Three interview cards per row (or full-width list).

Tablet

Two summary cards per row.

Interview cards stacked.

Mobile

Single-column layout.

Filters become expandable bottom sheet.

Search remains fixed at the top.

Action buttons become full width.

---

# 11.17 Accessibility

* Keyboard-accessible filters.
* Search field with descriptive label.
* Screen-reader announcements for sorting changes.
* High contrast badges.
* Visible focus indicators.

---

# 11.18 Acceptance Criteria

The Interview History page is considered complete when:

* Users can quickly locate any previous interview.
* Search and filters update results efficiently.
* Reports open correctly.
* Retry Interview pre-fills previous settings.
* The layout remains responsive across all devices.
* Empty, loading, and error states provide clear guidance.

---

# 11.19 Stitch Design Instructions

Generate a modern SaaS-style Interview History page using the MockMate AI design system.

Include:

* History summary cards
* Search bar
* Filter controls
* Sort dropdown
* Responsive interview cards
* Optional timeline toggle
* Hover animations
* View Report and Retry Interview actions
* Empty, loading, and error states

Use Indigo (#4F46E5) as the primary color, rounded 16px cards, generous spacing, soft shadows, Lucide icons, and smooth animations. The page should feel like a professional activity dashboard rather than a simple history list.

---

# 11.20 Future Enhancements

The page should be designed to support future features without major redesign.

Potential enhancements:

* Download PDF reports
* Voice interview replay
* AI answer playback
* Compare two interviews side-by-side
* Export interview history
* Share achievements
* Bookmark favorite interviews
* AI-generated monthly performance reports

These features should have reserved space in the design to ensure future scalability.

---

# Chapter Summary

The Interview History page acts as the user's long-term interview journal. It allows users to review their past performance, monitor growth, revisit AI feedback, and continue practicing through one-click interview retries. The interface should emphasize progress over perfection and encourage consistent improvement throughout the user's interview preparation journey.

# Chapter 12 – Analytics Dashboard Specification

# MockMate AI – Frontend Product Requirement Document

---

# 12.1 Purpose of the Analytics Dashboard

The Analytics Dashboard provides users with a comprehensive overview of their interview preparation journey through visual data and AI-powered insights.

Unlike the Results page, which focuses on a single interview, the Analytics Dashboard highlights long-term progress across multiple interviews.

The purpose is to help users:

* Track improvement over time.
* Identify strengths and weaknesses.
* Monitor interview consistency.
* Understand learning patterns.
* Receive AI-driven recommendations.
* Stay motivated through measurable progress.

The interface should feel like a professional performance analytics platform rather than a collection of charts.

---

# 12.2 User Journey

```text id="8vxq5u"
Dashboard
      ↓
Analytics
      ↓
Explore Performance
      ↓
Review AI Insights
      ↓
Plan Next Practice
```

---

# 12.3 Primary Goals

The Analytics page should enable users to:

* View long-term performance trends.
* Compare interviews over time.
* Analyze individual skills.
* Monitor interview frequency.
* Review confidence growth.
* Identify weak topics.
* Receive personalized practice suggestions.

---

# 12.4 Layout Structure

Desktop Layout

```text id="s0d2na"
---------------------------------------------------
Top Navigation
---------------------------------------------------

Analytics Summary

↓

Overall Performance Chart

↓

Skill Radar Chart + Score Distribution

↓

Practice Activity Heatmap

↓

Topic Performance

↓

AI Insights

↓

Improvement Goals
```

The layout should guide users from high-level metrics to detailed insights.

---

# 12.5 Analytics Summary Cards

Display six summary cards.

Card 1

Total Interviews

Card 2

Average Score

Card 3

Highest Score

Card 4

Current Practice Streak

Card 5

Average Interview Duration

Card 6

Overall Confidence Score

Each card includes:

* Icon
* Value
* Trend
* Short description

Hovering should slightly elevate the card.

---

# 12.6 Overall Performance Chart

Purpose

Show score progression across interviews.

Chart Type

Interactive Line Chart

X-Axis

Interview Number / Date

Y-Axis

Score (%)

Users should be able to hover over points to view:

* Interview Date
* Score
* Interview Type
* Job Role

The line should animate on initial load.

---

# 12.7 Skill Radar Chart

Purpose

Provide a visual comparison of key interview skills.

Skills

* Technical Knowledge
* Communication
* Problem Solving
* Confidence
* Professionalism
* Time Management

The radar chart should update dynamically as new interviews are completed.

Provide an explanation below the chart.

Example

> Your strongest area is Technical Knowledge. Focus on Communication and Time Management to achieve balanced performance.

---

# 12.8 Score Distribution

Chart Type

Bar Chart

Display average scores for each skill.

Users should immediately identify weaker areas.

Example

Technical

92%

Communication

74%

Confidence

80%

Professionalism

88%

---

# 12.9 Practice Activity Heatmap

Purpose

Visualize interview consistency.

Display GitHub-style calendar heatmap.

Each square represents one day.

Color intensity reflects interview count.

Hover tooltip

Example

June 15

Completed 2 interviews

This encourages daily practice.

---

# 12.10 Topic Performance

Display cards for individual interview topics.

Examples

React

JavaScript

DSA

HR Questions

System Design

Each card includes:

* Average Score
* Number of Interviews
* Improvement Trend

Users can click cards to view detailed reports.

---

# 12.11 AI Insights Panel

Purpose

Transform analytics into actionable advice.

Examples

"Your React performance has improved by 18% over the last month."

"You consistently lose marks in communication."

"Morning interviews result in higher scores."

Display each insight as a recommendation card.

Include priority indicators:

High

Medium

Low

---

# 12.12 Improvement Goals

Purpose

Help users focus on measurable objectives.

Display three active goals.

Example

Improve Communication Score to 85%

Progress

78%

Estimated Completion

2 Weeks

Each goal includes:

* Progress Bar
* Target
* Suggested Practice

---

# 12.13 Interview Frequency

Display chart showing:

Daily

Weekly

Monthly

Interview frequency.

AI should recommend maintaining consistent practice.

---

# 12.14 Comparison Mode (Future)

Users will be able to compare:

Current Month

vs

Previous Month

or

Interview A

vs

Interview B

Display side-by-side charts.

Placeholder card:

Coming Soon

---

# 12.15 Export Analytics (Future)

Buttons

Download PDF

Export CSV

Share Analytics

Reserved section for future implementation.

---

# 12.16 Loading State

Display:

* Skeleton cards
* Animated chart placeholders
* Loading indicators

Avoid layout shifts.

---

# 12.17 Empty State

If insufficient interview data exists:

Display illustration.

Message

Complete at least three interviews to unlock detailed analytics.

Primary Button

Start Interview

---

# 12.18 Error State

If analytics cannot be loaded:

Message

We couldn't load your analytics.

Buttons

Retry

Dashboard

---

# 12.19 Micro-interactions

* Summary cards animate on load.
* Charts draw smoothly.
* Heatmap fades in.
* Radar chart expands gradually.
* Progress bars animate.
* AI insight cards slide upward.

Animations should remain subtle.

---

# 12.20 Responsive Behaviour

Desktop

Two-column chart layout.

Tablet

Charts stack vertically.

Mobile

Single-column layout.

Horizontal scrolling for large charts.

Summary cards displayed in two columns.

Touch-friendly tooltips.

---

# 12.21 Accessibility

* Screen-reader support for charts.
* Keyboard navigation.
* High contrast colors.
* Text alternatives for graphs.
* Large touch targets.

---

# 12.22 Acceptance Criteria

The Analytics Dashboard is considered complete when:

* Users understand long-term progress within one minute.
* Charts load smoothly.
* AI insights are clear and actionable.
* Weak skills are easy to identify.
* Mobile users can access all analytics without losing functionality.

---

# 12.23 Stitch Design Instructions

Generate a premium SaaS Analytics Dashboard for MockMate AI.

Include:

* Six analytics summary cards
* Interactive line chart
* Radar chart
* Bar chart
* GitHub-style activity heatmap
* Topic performance cards
* AI insights panel
* Improvement goals section
* Responsive layouts
* Skeleton loading states
* Empty and error states

Use Indigo (#4F46E5) as the primary color, soft gradients, rounded 16px cards, generous whitespace, Lucide icons, interactive charts, and subtle animations. The interface should feel like a professional analytics platform with a clean and modern design.

---

# 12.24 Future Enhancements

The Analytics Dashboard should be designed to support future features such as:

* AI-based career readiness prediction
* Company-specific interview analytics
* Peer comparison (anonymous)
* Weekly email reports
* Monthly performance summaries
* Personalized learning roadmap
* AI coaching trends
* Placement readiness score
* Interview success probability
* Resume improvement analytics

These enhancements should fit naturally into the existing layout without major redesign.

---

# Chapter Summary

The Analytics Dashboard transforms interview history into meaningful career insights. Through interactive charts, AI recommendations, activity tracking, and measurable goals, it helps users understand not just how they performed in one interview, but how they are progressing over weeks and months. The design should motivate consistent practice while giving users a clear roadmap for continuous improvement.
# Chapter 13 – User Profile & Career Profile

# MockMate AI – Frontend Product Requirement Document

---

# 13.1 Purpose of the User Profile Page

The User Profile page serves as the user's personal workspace where they can manage their profile, career information, interview preferences, and achievements.

Unlike a basic profile page that only stores personal details, this page should function as a career profile that enables the AI to provide personalized interview experiences.

The page should answer these questions:

* Who am I?
* What career am I preparing for?
* What are my current skills?
* What interview preferences do I have?
* What achievements have I earned?
* How complete is my profile?

The interface should feel like a modern professional portfolio.

---

# 13.2 User Journey

```text
Dashboard
      ↓
Profile
      ↓
Edit Personal Details
      ↓
Update Career Information
      ↓
Save Profile
      ↓
AI Uses Updated Information
```

---

# 13.3 Primary Goals

The Profile page should allow users to:

* View personal information.
* Edit account details.
* Upload profile picture.
* Upload resume.
* Manage career preferences.
* Configure interview preferences.
* View achievements.
* Track profile completion.

---

# 13.4 Page Layout

Desktop Layout

```text
-----------------------------------------------------
Top Navigation
-----------------------------------------------------

Profile Header

↓

Left Column
• Avatar
• Basic Information
• Profile Completion

Right Column
• Career Information
• Resume
• Skills
• Interview Preferences
• Achievements
```

Desktop uses a two-column layout.

Tablet and mobile automatically convert to a single-column layout.

---

# 13.5 Profile Header

Display:

Large Profile Picture

Full Name

Email

Current Target Role

Member Since

Example

Tanvi Shinde

Frontend Developer

Joined June 2026

Right Side

Edit Profile Button

---

# 13.6 Profile Completion Card

Purpose

Encourage users to complete their profile.

Display

Circular Progress Indicator

Example

82% Complete

Checklist

✔ Profile Photo

✔ Career Goal

✔ Resume Uploaded

✔ Skills Added

⬜ LinkedIn Added

⬜ Portfolio Added

Clicking an incomplete item should navigate directly to that section.

---

# 13.7 Personal Information

Editable Fields

* Full Name
* Email Address
* Phone Number
* City
* Country
* Date of Birth (Optional)

Buttons

Save Changes

Cancel

Validation

Inline validation should appear immediately for incorrect input.

---

# 13.8 Career Information

Purpose

Personalize interview experiences.

Fields

Current Education

College / University

Graduation Year

Target Job Role

Experience Level

Dream Company (Optional)

Current CGPA (Optional)

These fields influence AI-generated interview questions.

---

# 13.9 Skills Section

Purpose

Store user technical skills.

Display as removable tags.

Examples

React

Node.js

Java

Python

C++

JavaScript

Users can:

Add Skill

Remove Skill

Search Existing Skills

Future AI recommendations will reference these skills.

---

# 13.10 Resume Management

Resume Upload Card

Supported Formats

PDF

DOCX

Maximum File Size

5 MB

Display after upload

File Name

Upload Date

Replace Resume

Delete Resume

AI should use the uploaded resume for resume-based interviews.

---

# 13.11 Portfolio & Social Links

Optional Fields

GitHub

LinkedIn

Portfolio Website

Personal Blog

Display recognizable icons.

Links should open in new tabs.

---

# 13.12 Interview Preferences

Purpose

Allow users to customize future interviews.

Settings

Preferred Language

Preferred Interview Type

Preferred Duration

Difficulty Level

Voice Interview (Future)

Camera Analysis (Future)

Changes should automatically become default selections during interview setup.

---

# 13.13 Achievements

Display earned badges.

Examples

🏅 First Interview

🔥 7-Day Practice Streak

⭐ 90% Score

💯 25 Interviews Completed

Display locked badges in grayscale.

Clicking a badge opens its description.

---

# 13.14 Activity Summary

Display:

Total Interviews

Average Score

Practice Streak

Career Readiness Score

Latest Achievement

These cards should mirror the Dashboard style.

---

# 13.15 Account Security

Separate security section.

Display

Password

---

Buttons

Change Password

Enable Two-Factor Authentication (Future)

Manage Devices (Future)

Sensitive information should never be displayed openly.

---

# 13.16 Notification Preferences

Toggle switches

Interview Reminders

Email Reports

Achievement Notifications

Weekly Progress Summary

Product Updates

Changes should save automatically.

---

# 13.17 Theme Preferences

Future settings

Light Mode

Dark Mode

System Theme

Font Size

Animation Preference

Keep placeholders for future implementation.

---

# 13.18 Loading State

Display skeleton placeholders for:

Avatar

Profile cards

Input fields

Skill tags

Resume section

Avoid layout shifts.

---

# 13.19 Empty State

If no profile exists:

Display illustration.

Message

Complete your career profile to unlock personalized AI interviews.

Primary Button

Complete Profile

---

# 13.20 Error State

If saving fails:

Display

"We couldn't save your changes."

Buttons

Retry

Discard Changes

Unsaved data should remain intact.

---

# 13.21 Micro-interactions

* Avatar enlarges slightly on hover.
* Skill tags animate when added or removed.
* Progress circle fills smoothly.
* Save button shows loading animation.
* Badge cards scale gently on hover.
* Success toast appears after saving.

Animations should remain below 300ms.

---

# 13.22 Responsive Behaviour

Desktop

Two-column layout.

Tablet

Cards stack vertically.

Mobile

Single-column layout.

Sticky Save button.

Large touch-friendly form controls.

Profile image centered.

---

# 13.23 Accessibility

* All form fields have labels.
* Keyboard navigation supported.
* Screen readers announce profile completion updates.
* High contrast buttons.
* Error messages linked to their inputs.

---

# 13.24 Acceptance Criteria

The User Profile page is complete when:

* Users can update all profile information.
* Resume upload works correctly.
* Skills can be added and removed.
* Interview preferences are saved.
* Profile completion updates dynamically.
* Mobile and desktop experiences remain consistent.

---

# 13.25 Stitch Design Instructions

Generate a premium SaaS-style User Profile page for MockMate AI.

Include:

* Profile header with avatar
* Profile completion card
* Personal information form
* Career information section
* Skills tag manager
* Resume upload card
* Social links
* Interview preferences
* Achievement badges
* Activity summary
* Security section
* Notification settings
* Responsive layouts
* Loading, empty, and error states

Use Indigo (#4F46E5) as the primary color with rounded 16px cards, generous whitespace, Lucide icons, subtle hover animations, and clean typography. The page should resemble a modern professional career dashboard rather than a basic account settings page.

---

# 13.26 Future Enhancements

The page should be designed to accommodate future features without major redesign.

Future capabilities include:

* AI-generated career roadmap
* Resume score analysis
* LinkedIn profile import
* GitHub repository analysis
* Skill verification certificates
* Company-specific preparation profiles
* Multiple resumes for different job roles
* AI-generated professional bio
* Placement application tracker
* Mentor profile integration

Reserve expandable sections so these features can be introduced seamlessly.

---

# Chapter Summary

The User Profile page is the foundation of personalization in MockMate AI. It stores the user's professional identity, career goals, technical skills, and interview preferences, enabling the AI to generate highly relevant interview questions and recommendations. The page should feel like a modern career portfolio that evolves alongside the user's interview journey.

# Chapter 14 – Settings Page

# MockMate AI – Frontend Product Requirement Document

---

# 14.1 Purpose of the Settings Page

The Settings page provides users with centralized control over their account and application preferences.

It should allow users to personalize their MockMate AI experience while maintaining privacy, security, and accessibility.

The page should feel organized and easy to navigate, even though it contains multiple categories of settings.

Users should never feel overwhelmed.

---

# 14.2 User Journey

```text
Dashboard
      ↓
Settings
      ↓
Select Category
      ↓
Modify Preferences
      ↓
Save Automatically
      ↓
Updated Across Entire App
```

---

# 14.3 Primary Goals

The Settings page should enable users to:

* Manage account settings.
* Configure interview preferences.
* Control notifications.
* Change appearance.
* Manage privacy.
* Configure accessibility options.
* Manage security settings.
* View connected accounts.
* Delete or deactivate account.

---

# 14.4 Layout Structure

Desktop Layout

```text
-------------------------------------------------------
Top Navigation
-------------------------------------------------------

Left Sidebar

• Account
• Interview Preferences
• Notifications
• Appearance
• Privacy
• Security
• Connected Accounts
• Accessibility
• About

↓

Right Panel

Selected Settings
```

Desktop uses two-column navigation.

Tablet

Collapsible navigation.

Mobile

Accordion-based layout.

---

# 14.5 Account Settings

Fields

* Full Name
* Email
* Phone Number
* Profile Photo

Buttons

Save Changes

Cancel

Validation

Inline validation with instant feedback.

---

# 14.6 Interview Preferences

Purpose

Set default interview behavior.

Fields

Preferred Interview Type

Preferred Language

Preferred Difficulty

Preferred Duration

Auto Save Answers

Voice Interview (Future)

Camera Analysis (Future)

These preferences automatically populate the Interview Setup page.

---

# 14.7 Notification Settings

Display toggle switches.

Options

Interview Reminders

Daily Practice Reminder

Weekly Progress Report

Achievement Notifications

Email Notifications

Product Updates

Security Alerts

Each change saves automatically.

---

# 14.8 Appearance Settings

Theme

☀ Light

🌙 Dark

💻 System Default

Accent Color (Future)

Animation Level

Normal

Reduced

Disabled

Font Size

Small

Medium

Large

Preview panel updates in real time.

---

# 14.9 Privacy Settings

Users should control their personal data.

Options

Public Profile

Share Anonymous Analytics

Personalized AI Training

Allow Resume Analysis

Allow Voice Recording (Future)

Each option clearly explains what data is used.

---

# 14.10 Security Settings

Display

Password

---

Buttons

Change Password

Sessions

Manage Logged-in Devices

Future

Enable Two-Factor Authentication

Login History

Recovery Email

Sensitive actions require password confirmation.

---

# 14.11 Connected Accounts

Display cards.

Supported integrations

GitHub

LinkedIn

Google

Microsoft

Each card shows

Connection Status

Last Sync

Connect

Disconnect

Future integrations should fit without redesign.

---

# 14.12 Accessibility Settings

Purpose

Support users with different accessibility needs.

Options

High Contrast Mode

Keyboard Navigation

Reduced Motion

Screen Reader Optimization

Large Buttons

Large Text

Settings apply immediately.

---

# 14.13 Data Management

Users should control their data.

Options

Download My Data

Export Interview Reports

Export Analytics

Delete Resume

Clear Interview History

Delete AI Cache

Each destructive action requires confirmation.

---

# 14.14 Delete / Deactivate Account

Separate warning section.

Buttons

Deactivate Account

Delete Account Permanently

Confirmation Modal

Explain consequences clearly.

Example

Deleting your account permanently removes all interview history, reports, analytics, and uploaded files.

Require password confirmation.

---

# 14.15 About Section

Display

Application Version

Build Number

Privacy Policy

Terms of Service

Contact Support

Release Notes

Future

Check for Updates

---

# 14.16 Loading State

Skeleton placeholders for settings cards.

Loading toggles.

Loading profile image.

No layout shift.

---

# 14.17 Empty State

If user data cannot be loaded

Display

Illustration

Message

Your settings are currently unavailable.

Buttons

Retry

Go to Dashboard

---

# 14.18 Error State

If settings fail to save

Display inline banner.

Message

We couldn't save your changes.

Buttons

Retry

Dismiss

Never discard user input automatically.

---

# 14.19 Micro-interactions

* Toggle switches animate smoothly.
* Cards elevate slightly on hover.
* Theme preview updates instantly.
* Success toast appears after saving.
* Delete buttons display confirmation animations.
* Connected account cards animate when linked.

Animations should remain subtle (under 300ms).

---

# 14.20 Responsive Behaviour

Desktop

Sidebar navigation.

Wide settings cards.

Tablet

Collapsible menu.

Cards expand.

Mobile

Accordion layout.

Sticky Save button (for manual save forms).

Large touch-friendly controls.

---

# 14.21 Accessibility

* Keyboard navigation throughout.
* Proper labels for all inputs.
* High-contrast support.
* Screen-reader friendly toggles.
* Focus indicators.
* Error messages linked to relevant controls.

---

# 14.22 Acceptance Criteria

The Settings page is complete when:

* Users can configure every preference without confusion.
* Changes apply consistently across the application.
* Sensitive actions require confirmation.
* Accessibility options take effect immediately.
* Mobile and desktop layouts are fully responsive.

---

# 14.23 Stitch Design Instructions

Generate a premium SaaS-style Settings page for MockMate AI.

Include:

* Left navigation sidebar
* Modular settings cards
* Toggle switches
* Dropdowns
* Theme selector with preview
* Connected account cards
* Security section
* Privacy controls
* Accessibility options
* Data management section
* Danger zone for account deletion
* Loading, empty, and error states

Use Indigo (#4F46E5) as the primary color, rounded 16px cards, soft shadows, Lucide icons, generous whitespace, and subtle animations. The interface should feel clean, trustworthy, and easy to navigate.

---

# 14.24 Future Enhancements

Design the page to support future features such as:

* AI personality customization
* Multiple interview profiles
* Company-specific settings
* AI voice selection
* Regional language packs
* Calendar integration
* Smart reminder scheduling
* Cloud backup preferences
* Premium subscription management
* Team and mentor account settings

These features should integrate naturally into the existing layout.

---

# Chapter Summary

The Settings page serves as the centralized control hub for MockMate AI. It empowers users to manage their account, personalize interviews, adjust privacy and security, customize appearance, and configure accessibility. The interface should balance powerful functionality with simplicity, ensuring users can confidently manage every aspect of their interview preparation experience.
# Chapter 15 – Notifications & Activity Center

# MockMate AI – Frontend Product Requirement Document

---

# 15.1 Purpose of the Notifications & Activity Center

The Notifications & Activity Center serves as the communication hub between MockMate AI and the user.

Instead of displaying generic notifications, this page should deliver personalized updates that encourage consistent interview practice, celebrate achievements, provide reminders, and surface AI-generated career insights.

The goal is to keep users engaged without overwhelming them.

Users should feel that the application is actively supporting their career journey.

---

# 15.2 User Journey

```text id="yb8n7c"
Dashboard
      ↓
Notification Bell
      ↓
Notification Center
      ↓
Open Notification
      ↓
Related Screen
```

Notifications should always redirect users to the appropriate page.

---

# 15.3 Primary Goals

The Notification Center should allow users to:

* View recent notifications.
* Read AI recommendations.
* Track achievements.
* Receive interview reminders.
* View system announcements.
* Mark notifications as read.
* Filter notifications.
* Delete notifications.

---

# 15.4 Layout Structure

Desktop Layout

```text id="syk4gx"
-------------------------------------------------------
Top Navigation
-------------------------------------------------------

Notification Summary

↓

Filter Tabs

↓

Notification List

↓

Activity Timeline
```

The layout should prioritize readability.

---

# 15.5 Notification Summary

Display four summary cards.

Unread Notifications

Today's Activities

Achievements This Month

Practice Reminder Status

Each card includes:

* Icon
* Value
* Description

Example

Unread

12

New AI feedback available

---

# 15.6 Filter Tabs

Users can filter notifications.

Categories

All

AI Insights

Interview Updates

Achievements

Reminders

System

Security

The active filter should be highlighted.

Filtering should update instantly.

---

# 15.7 Notification Card Design

Each notification card includes:

* Icon
* Title
* Description
* Time
* Status
* Action Button

Example

🎉

New Achievement Unlocked

You completed your 10th interview.

5 Minutes Ago

View Achievement

Unread notifications display a colored indicator.

---

# 15.8 AI Insight Notifications

Examples

Your communication score improved by 8%.

Try an Advanced React interview next.

You haven't practiced for three days.

Complete one interview to maintain your streak.

Each insight should include a relevant action button.

---

# 15.9 Interview Notifications

Examples

Interview completed successfully.

AI report is ready.

Resume-based interview generated.

Coding interview available (Future).

Buttons

View Report

Start Interview

---

# 15.10 Achievement Notifications

Examples

🔥 7-Day Practice Streak

🏆 Top Performance

⭐ First 90% Score

🎯 50 Interviews Completed

Each notification links directly to the achievement page.

---

# 15.11 Reminder Notifications

Examples

Daily Practice Reminder

Weekly Interview Goal

Resume Update Reminder

Upcoming Placement Season Reminder

Users should be able to snooze reminders.

---

# 15.12 System Notifications

Examples

New AI feature released.

Application updated.

Scheduled maintenance.

Privacy policy updated.

These notifications should be visually distinct from AI recommendations.

---

# 15.13 Activity Timeline

Purpose

Provide a chronological history of user activities.

Examples

Completed Interview

Uploaded Resume

Updated Skills

Unlocked Badge

Changed Settings

Timeline entries include timestamps and icons.

---

# 15.14 Notification Actions

Each notification supports:

Open

Mark as Read

Delete

Archive (Future)

Mark All as Read

Bulk actions should be available.

---

# 15.15 Search Notifications

Provide a search bar.

Placeholder

Search notifications...

Search by:

Keyword

Date

Notification Type

Search updates results instantly.

---

# 15.16 Empty State

If there are no notifications:

Display illustration.

Message

You're all caught up!

Check back later for AI recommendations and interview updates.

Primary Button

Start New Interview

---

# 15.17 Error State

If notifications fail to load:

Message

We couldn't load your notifications.

Buttons

Retry

Go to Dashboard

---

# 15.18 Loading State

Display:

Skeleton notification cards

Loading summary cards

Animated placeholders

Avoid layout shifts.

---

# 15.19 Micro-interactions

* Cards slide into view.
* Unread indicator fades after opening.
* Filters animate smoothly.
* Timeline expands with transitions.
* Success toast after marking notifications as read.
* Bell icon animates when new notifications arrive.

Animations should remain subtle (under 300ms).

---

# 15.20 Responsive Behaviour

Desktop

Two-column layout with activity timeline.

Tablet

Timeline moves below notifications.

Mobile

Single-column layout.

Filter tabs become horizontally scrollable.

Notification cards become full width.

Sticky search bar.

---

# 15.21 Accessibility

* Keyboard navigation.
* Screen-reader announcements for new notifications.
* High-contrast unread indicators.
* Proper ARIA labels for actions.
* Focus indicators on all interactive elements.

---

# 15.22 Acceptance Criteria

The Notification Center is complete when:

* Notifications load efficiently.
* Filters and search work instantly.
* Notifications navigate to the correct destination.
* Read/unread status updates correctly.
* Mobile and desktop experiences remain consistent.

---

# 15.23 Stitch Design Instructions

Generate a premium SaaS-style Notifications & Activity Center for MockMate AI.

Include:

* Notification summary cards
* Filter tabs
* Search bar
* Responsive notification cards
* Activity timeline
* Mark as read/delete actions
* Empty, loading, and error states
* Subtle animations
* Sticky header on mobile

Use Indigo (#4F46E5) as the primary color with rounded 16px cards, soft shadows, generous whitespace, Lucide icons, and smooth transitions. The page should resemble a modern productivity application's notification center rather than a basic message list.

---

# 15.24 Future Enhancements

The Notification Center should be designed to support:

* Push notifications
* Email notification history
* WhatsApp reminders
* Calendar integration
* AI smart scheduling
* Company-specific job alerts
* Placement drive notifications
* Mentor messages
* Team collaboration notifications
* Premium notification customization

These features should integrate without major layout changes.

---

# Chapter Summary

The Notifications & Activity Center is the communication hub of MockMate AI. It keeps users informed, motivated, and engaged by combining AI insights, interview reminders, achievements, and system updates in a single organized interface. The design should feel proactive and intelligent, helping users stay consistent in their interview preparation while avoiding unnecessary distractions.
# Chapter 16 – Help & Support Center

# MockMate AI – Frontend Product Requirement Document

---

# 16.1 Purpose of the Help & Support Center

The Help & Support Center is the central place where users can find answers to common questions, contact support, report issues, and interact with the AI Assistant.

Rather than being a static FAQ page, it should function as an intelligent support hub that helps users solve problems quickly and continue their interview preparation without interruptions.

The experience should be friendly, accessible, and reassuring.

---

# 16.2 User Journey

```text
Dashboard
      ↓
Help & Support
      ↓
Search Help Articles
      ↓
Read Solution
      ↓
Still Need Help?
      ↓
AI Chat / Contact Support
```

---

# 16.3 Primary Goals

The Help Center should allow users to:

* Search documentation.
* Browse FAQs.
* Chat with the AI Assistant.
* Contact customer support.
* Report bugs.
* Request new features.
* Track submitted support tickets.
* Learn how to use MockMate AI.

---

# 16.4 Layout Structure

Desktop Layout

```text
-----------------------------------------------------
Top Navigation
-----------------------------------------------------

Help Header

↓

Universal Search Bar

↓

Quick Action Cards

↓

Popular Help Articles

↓

Frequently Asked Questions

↓

AI Assistant Chat

↓

Contact Support

↓

Submit Feedback
```

The page should follow a clean vertical flow with generous spacing.

---

# 16.5 Help Header

Display:

Large illustration

Title

Help & Support

Subtitle

How can we help you today?

Below the subtitle display:

Search Bar

Placeholder

Search for articles, features, or questions...

Search should return results instantly.

---

# 16.6 Quick Action Cards

Display six action cards.

Each card includes:

* Icon
* Title
* Short description

Cards

Getting Started

Interview Guide

Resume Help

Account Settings

Report a Bug

Contact Support

Cards animate slightly on hover.

---

# 16.7 Popular Help Articles

Display article cards.

Each card contains:

* Article Title
* Category
* Estimated Reading Time
* Short Description

Examples

How to Start Your First Interview

Understanding AI Feedback

How Career Readiness Works

Uploading Your Resume

Managing Interview History

Users can bookmark articles for later.

---

# 16.8 Frequently Asked Questions (FAQ)

Display an accordion list.

Examples

How does AI evaluate my answers?

Can I retake interviews?

Is my resume secure?

Can I practice without uploading a resume?

How is my Career Readiness Score calculated?

Each answer expands smoothly.

Only one accordion should remain open at a time.

---

# 16.9 AI Assistant Chat

Purpose

Provide instant support for common questions.

Layout

Chat window with:

* Conversation history
* Message input
* Send button
* Suggested prompts

Suggested Prompts

How do I improve communication?

Explain my analytics dashboard.

Why is my score low?

How can I prepare for React interviews?

The AI Assistant should feel like a helpful mentor.

---

# 16.10 Contact Support

If the AI cannot solve the issue, users can contact support.

Form Fields

Name

Email

Subject

Issue Category

Message

Attachment (Optional)

Submit Button

After submission display:

Support Ticket ID

Expected response time

---

# 16.11 Report a Bug

Dedicated form.

Fields

Bug Title

Description

Steps to Reproduce

Screenshot Upload

Browser

Operating System

Priority

Submit Report

Display confirmation after submission.

---

# 16.12 Feature Request

Allow users to suggest improvements.

Fields

Feature Title

Description

Expected Benefit

Category

Voting System (Future)

Confirmation message after submission.

---

# 16.13 Support Ticket History

Display previous requests.

Each ticket includes:

* Ticket ID
* Subject
* Date
* Status
* Last Updated

Status Badges

Open

In Progress

Resolved

Closed

Clicking a ticket opens full conversation history.

---

# 16.14 Feedback Section

Simple feedback widget.

Question

Was this page helpful?

Buttons

👍 Yes

👎 No

Optional text field

Additional Comments

Thank-you toast appears after submission.

---

# 16.15 Empty State

If no tickets exist:

Illustration

Message

You haven't contacted support yet.

Button

Browse Help Articles

---

# 16.16 Loading State

Display:

Skeleton article cards

Skeleton FAQ

Loading chat

Placeholder forms

Avoid layout shifts.

---

# 16.17 Error State

If help content fails to load:

Message

We couldn't load the Help Center.

Buttons

Retry

Return to Dashboard

---

# 16.18 Micro-interactions

* Cards elevate on hover.
* FAQ accordion expands smoothly.
* AI typing indicator animates.
* Search suggestions appear while typing.
* Ticket cards fade into view.
* Success toasts appear after submitting forms.

Animations should remain under 300ms.

---

# 16.19 Responsive Behaviour

Desktop

Two-column layout for articles and chat.

Tablet

Cards stack vertically.

Mobile

Single-column layout.

Sticky search bar.

Floating AI chat button.

Large touch-friendly controls.

---

# 16.20 Accessibility

* Keyboard navigation.
* Screen-reader support for forms and chat.
* High-contrast buttons.
* Proper labels for every input.
* Visible focus indicators.
* Accessible accordion navigation.

---

# 16.21 Acceptance Criteria

The Help & Support Center is complete when:

* Users can find answers quickly.
* Search returns relevant help articles.
* FAQ is easy to browse.
* AI Assistant responds smoothly.
* Support requests can be submitted.
* Ticket history is accessible.
* Mobile and desktop experiences are consistent.

---

# 16.22 Stitch Design Instructions

Generate a modern SaaS-style Help & Support Center for MockMate AI.

Include:

* Hero header with search bar
* Quick action cards
* Help article cards
* FAQ accordion
* AI chat interface
* Contact support form
* Bug report form
* Feature request form
* Support ticket history
* Feedback widget
* Loading, empty, and error states

Use Indigo (#4F46E5) as the primary color, rounded 16px cards, soft shadows, generous spacing, Lucide icons, and smooth animations. The page should feel like the support center of a premium SaaS product.

---

# 16.23 Future Enhancements

Design the Help Center to support future capabilities:

* Voice-based AI support
* Screen-sharing support sessions
* Video tutorials
* Community discussion forum
* Mentor live chat
* AI-powered troubleshooting
* Multi-language support
* In-app onboarding tours
* Personalized help recommendations
* Support chatbot memory

Reserve space for these additions without changing the overall layout.

---

# Chapter Summary

The Help & Support Center serves as the user's primary destination for assistance throughout their MockMate AI journey. By combining searchable documentation, FAQs, AI-powered assistance, support ticket management, and feedback collection, the page ensures users can quickly resolve issues, learn platform features, and stay focused on interview preparation. The design should reinforce trust, accessibility, and professionalism while maintaining the clean, modern aesthetic of the rest of the application.

# Chapter 17 – Global Design System & UI Guidelines

# MockMate AI – Frontend Product Requirement Document

---

# 17.1 Purpose

The Design System establishes a consistent visual identity and user experience across the entire MockMate AI application.

Every page, component, interaction, animation, and visual element must follow this design system.

The goal is to ensure that the application feels professional, cohesive, scalable, and easy to maintain.

The interface should resemble a premium SaaS product similar to Linear, Notion, Vercel, Clerk, or Stripe Dashboard.

---

# 17.2 Design Philosophy

MockMate AI should communicate:

* Professionalism
* Intelligence
* Simplicity
* Trust
* Modern Technology
* Career Growth

The interface should never feel crowded.

Users should always know:

* Where they are
* What to do next
* What information is important

Every screen should reduce cognitive load.

---

# 17.3 Overall Theme

Style

Modern SaaS Dashboard

Design Language

Minimal

Clean

Professional

Soft

Rounded

Friendly

Avoid:

Heavy gradients

Glassmorphism everywhere

Neon colors

Overuse of animations

Excessive shadows

---

# 17.4 Color Palette

Primary

Indigo

#4F46E5

Primary Hover

#4338CA

Primary Light

#EEF2FF

Background

#F8FAFC

Surface

White (#FFFFFF)

Primary Text

#0F172A

Secondary Text

#475569

Border

#E2E8F0

Success

#22C55E

Warning

#F59E0B

Error

#EF4444

Information

#3B82F6

Use colors consistently throughout the application.

---

# 17.5 Typography

Font Family

Inter

Fallback

System Sans Serif

Heading Sizes

H1

36px

H2

30px

H3

24px

H4

20px

Body

16px

Small Text

14px

Caption

12px

Font Weight

Regular

Medium

Semi Bold

Bold

Line Height

1.5

---

# 17.6 Grid System

Desktop

12 Columns

Tablet

8 Columns

Mobile

4 Columns

Maximum Content Width

1440px

Content Padding

Desktop

32px

Tablet

24px

Mobile

16px

---

# 17.7 Spacing System

Use an 8-point spacing system.

Spacing Values

4px

8px

16px

24px

32px

40px

48px

64px

Avoid arbitrary spacing values.

---

# 17.8 Border Radius

Buttons

12px

Cards

16px

Modals

20px

Inputs

12px

Badges

999px (pill)

Maintain consistency across components.

---

# 17.9 Shadows

Cards

Light shadow

Hover

Medium shadow

Modals

Soft elevated shadow

Avoid heavy shadows.

---

# 17.10 Buttons

Primary

Filled Indigo

Secondary

Outline

Ghost

Transparent

Danger

Red

Success

Green

States

Default

Hover

Active

Disabled

Loading

Every button should have clear visual feedback.

---

# 17.11 Form Components

Text Fields

Dropdowns

Checkboxes

Radio Buttons

Toggle Switches

Date Picker

File Upload

Requirements

Clear labels

Inline validation

Helper text

Error messages

Consistent heights

---

# 17.12 Cards

Used throughout the application.

Every card should include

Padding

Rounded corners

Subtle shadow

Optional icon

Optional action

Hover animation

Cards should never feel cramped.

---

# 17.13 Icons

Use Lucide Icons.

Style

Outline

Size

20px

24px

32px

Avoid mixing multiple icon libraries.

---

# 17.14 Navigation

Desktop

Persistent left sidebar

Top navigation bar

Mobile

Bottom navigation

Hamburger menu

Current page should always be highlighted.

---

# 17.15 Tables

Rounded corners

Sticky header

Hover row highlight

Pagination

Search

Sorting

Empty state

Loading state

Responsive scrolling

---

# 17.16 Charts

Charts should use consistent colors.

Supported Charts

Line

Bar

Radar

Pie

Area

Heatmap

Every chart must include:

Legend

Tooltip

Labels

Accessible color contrast

---

# 17.17 Animations

Animation Duration

150–300ms

Use animations for:

Hover

Loading

Navigation

Cards

Progress

Charts

Avoid unnecessary motion.

Respect Reduced Motion accessibility settings.

---

# 17.18 Loading States

Every page should support:

Skeleton screens

Progress indicators

Loading buttons

Animated placeholders

Avoid blank white screens.

---

# 17.19 Empty States

Every module should include:

Illustration

Helpful message

Primary action

Examples

No interviews yet

No analytics available

No notifications

No support tickets

No search results

---

# 17.20 Error States

Every page should include:

Friendly error message

Retry button

Alternative action

Never expose technical error logs.

---

# 17.21 Success Feedback

Display success using:

Toast notifications

Success banners

Animated checkmarks

Examples

Profile Updated

Interview Submitted

Resume Uploaded

Settings Saved

---

# 17.22 Modal Guidelines

Every modal includes:

Title

Description

Primary Button

Secondary Button

Close Button

Escape key support

Click outside to close (except destructive actions).

---

# 17.23 Accessibility

Support

Keyboard navigation

Screen readers

High contrast

Visible focus indicators

Large touch targets

Proper labels

ARIA roles

Reduced motion

Color should never be the only indicator of state.

---

# 17.24 Responsive Design

Desktop

1440px+

Laptop

1024px+

Tablet

768px+

Mobile

375px+

Every page should adapt without losing functionality.

---

# 17.25 Performance Guidelines

Target Page Load

< 2 seconds

Lazy load heavy components.

Optimize images.

Use skeleton screens.

Avoid unnecessary re-renders.

---

# 17.26 Reusable Components

The frontend should be built using reusable UI components.

Core Components

* Buttons
* Inputs
* Cards
* Badges
* Modals
* Toasts
* Navigation
* Tabs
* Accordions
* Charts
* Progress Bars
* Avatars
* File Upload
* Dropdowns
* Skeleton Loaders
* Empty State Components
* Error Components

These components should be reused throughout the application for consistency.

---

# 17.27 Design Tokens

Create reusable design tokens for:

Colors

Typography

Spacing

Border Radius

Shadows

Animation Duration

Icon Sizes

Breakpoints

These tokens ensure scalability and maintainability.

---

# 17.28 Stitch Design Instructions

Generate the entire MockMate AI frontend using a premium SaaS design system.

Requirements:

* Clean minimalist UI
* Indigo (#4F46E5) primary color
* White cards on light gray background
* Rounded 16px cards
* Inter typography
* Lucide icons
* 8-point spacing system
* Responsive layouts
* Accessible components
* Soft shadows
* Smooth 150–300ms animations
* Consistent reusable components across all pages

The overall experience should resemble a production-ready startup application suitable for placement portfolios.

---

# 17.29 Future Scalability

The design system should support future features without redesigning the application.

Planned future modules include:

* Live Voice Interviews
* Webcam Analysis
* Coding Playground
* AI Resume Builder
* AI Cover Letter Generator
* Company-specific Interview Packs
* Mentor Dashboard
* Admin Panel
* Team Collaboration
* Premium Subscription
* Mobile App
* Multi-language Support
* Offline Interview Practice

The design system should remain consistent as these features are added.

---

# 17.30 Final Acceptance Criteria

The MockMate AI frontend is considered complete when:

* Every page follows the same design language.
* Colors, typography, spacing, and components remain consistent.
* Responsive behavior works across all devices.
* Accessibility guidelines are met.
* Loading, empty, and error states exist for every module.
* Reusable components are used throughout the application.
* The application feels like a polished, production-ready SaaS product rather than a student project.

---

# Final Project Summary

MockMate AI is a modern AI-powered interview preparation platform designed to help students and job seekers practice interviews, receive intelligent feedback, track progress, and improve their career readiness.

The frontend consists of:

1. Landing Page
2. Authentication
3. Onboarding
4. Dashboard
5. Interview Setup
6. Live Interview
7. AI Analysis
8. Results & Feedback
9. Interview History
10. Analytics Dashboard
11. User Profile
12. Settings
13. Notifications
14. Help & Support
15. Design System

Together, these modules create a complete, scalable, and premium user experience suitable for real-world deployment and future expansion.

Since this is your **first major solo project**, the best tech stack is one that is **modern, AI-friendly, easy to learn, and widely used in startups**. It should also work well with your vibe-coding workflow using Stitch, Claude Code, and Antigravity.

# 🚀 Complete Tech Stack for MockMate AI

## 1. Frontend

| Technology          | Why?                                     |
| ------------------- | ---------------------------------------- |
| **React.js**        | Industry standard for frontend           |
| **TypeScript**      | Better code quality and easier debugging |
| **Tailwind CSS**    | Fast UI development                      |
| **shadcn/ui**       | Beautiful, production-ready components   |
| **Framer Motion**   | Smooth animations                        |
| **React Router**    | Routing between pages                    |
| **React Hook Form** | Easy form handling                       |
| **Zod**             | Form validation                          |
| **Axios**           | API requests                             |
| **Recharts**        | Analytics charts                         |

---

## 2. Backend

| Technology     | Why?                              |
| -------------- | --------------------------------- |
| **Node.js**    | JavaScript everywhere             |
| **Express.js** | Lightweight and beginner-friendly |
| **TypeScript** | Maintainable backend code         |
| **Prisma ORM** | Simplifies database operations    |
| **REST API**   | Easy to understand and implement  |

---

## 3. Database

I recommend:

### ✅ PostgreSQL

Why?

* Used in startups
* Scalable
* Works perfectly with Prisma
* Excellent support

Development:

* PostgreSQL (local)

Production:

* Neon PostgreSQL (free tier)

---

## 4. Authentication

I recommend

### Clerk

Features

✅ Google Login

✅ GitHub Login

✅ Email Login

✅ OTP

✅ User Management

✅ Session Management

No need to build authentication yourself.

---

## 5. AI Integration

### OpenAI API

Use it for

* Interview question generation
* HR interview questions
* Technical questions
* AI feedback
* Score generation
* Personalized recommendations

---

## 6. Resume Parsing

Initially

Simple PDF Upload

Later

Resume parser

Future

AI Resume Analysis

---

## 7. File Storage

Use

### Cloudinary

Store

* Resume PDFs
* Profile Pictures

Simple and beginner-friendly.

---

## 8. Charts

Use

### Recharts

Perfect for

* Line chart
* Radar chart
* Pie chart
* Analytics dashboard

---

## 9. State Management

For your first project

### Zustand

Why?

* Easier than Redux
* Minimal boilerplate
* Great for React

Use it for

* Logged-in user
* Interview state
* Theme
* Notifications

---

## 10. Data Fetching

### TanStack Query (React Query)

Benefits

* API caching
* Loading states
* Automatic refetch
* Error handling

---

## 11. Deployment

### Frontend

Vercel

Perfect for React apps.

### Backend

Railway

Easy deployment for Node.js.

### Database

Neon PostgreSQL

---

## 12. Email

### Resend

For

* Welcome email
* Password reset
* Weekly report
* Interview reminder

---

## 13. Icons

Lucide React

Clean

Minimal

Consistent

---

## 14. Notifications

Initially

React Hot Toast

Later

Firebase Cloud Messaging

---

## 15. Logging

Development

Console

Production

Sentry (future)

---

## 16. Version Control

Git

GitHub

GitHub Projects (optional for task management)

---

## 17. AI Coding Tools

Exactly as you planned:

### Stitch

✔ Generate UI

---

### Claude Code

✔ Refactoring

✔ Bug fixing

✔ Explain code

---

### Antigravity

✔ Generate backend

✔ MCP integration

✔ Connect APIs

---

## 18. Development Tools

| Tool             | Purpose         |
| ---------------- | --------------- |
| VS Code          | IDE             |
| Postman or Bruno | API testing     |
| npm              | Package manager |
| ESLint           | Code quality    |
| Prettier         | Code formatting |

---

# 🏗 Project Architecture

```
Frontend (React + TypeScript)
│
├── Tailwind CSS
├── shadcn/ui
├── Zustand
├── React Query
├── Framer Motion
│
│
Backend (Node.js + Express)
│
├── Clerk Authentication
├── OpenAI API
├── Prisma
│
│
Database
│
└── PostgreSQL (Neon)
│
│
Storage
│
└── Cloudinary
│
│
Deployment
│
├── Vercel
├── Railway
└── Neon
```

---

# 📂 Suggested Folder Structure

```
mockmate-ai/

frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── hooks/
│   ├── services/
│   ├── store/
│   ├── types/
│   ├── utils/
│   ├── assets/
│   └── App.tsx
│
backend/
│
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── prisma/
│   ├── utils/
│   ├── config/
│   └── app.ts
│
shared/
│
README.md
```

---

# 🤖 AI APIs You'll Need

* **OpenAI API** – Generate interview questions, evaluate answers, provide feedback, and create personalized recommendations.
* **Speech-to-Text (future)** – Convert spoken answers to text.
* **Text-to-Speech (future)** – AI interviewer voice.
* **PDF Parsing (future)** – Resume-based interview personalization.

---

# ⭐ Final Recommended Tech Stack (Version 1)

| Layer            | Technology                     |
| ---------------- | ------------------------------ |
| Frontend         | React + TypeScript             |
| Styling          | Tailwind CSS + shadcn/ui       |
| Animations       | Framer Motion                  |
| Backend          | Node.js + Express + TypeScript |
| Database         | PostgreSQL (Neon) + Prisma     |
| Authentication   | Clerk                          |
| AI               | OpenAI API                     |
| State Management | Zustand                        |
| Data Fetching    | TanStack Query                 |
| Charts           | Recharts                       |
| File Storage     | Cloudinary                     |
| Email            | Resend                         |
| Deployment       | Vercel + Railway + Neon        |
| Icons            | Lucide React                   |
| Code Quality     | ESLint + Prettier              |
| Version Control  | Git + GitHub                   |

## 🎯 Recommendation for a First Solo Project

Avoid adding too many technologies at once. Build **Version 1** with the essentials:

* ✅ React + TypeScript
* ✅ Tailwind CSS + shadcn/ui
* ✅ Node.js + Express
* ✅ PostgreSQL + Prisma
* ✅ Clerk Authentication
* ✅ OpenAI API
* ✅ Zustand
* ✅ TanStack Query
* ✅ Vercel + Railway + Neon

Once the core product is working, you can gradually add advanced features like voice interviews, webcam analysis, push notifications, and resume parsing. This approach keeps the project manageable while still resulting in a professional, portfolio-worthy application.

