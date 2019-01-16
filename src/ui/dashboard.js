import React from 'react'
import {ProjectsOverview} from '../container/projects_overview'
import {Header} from '../container/header'
import {Navigation} from './navigation_view'

export const Dashboard=()=>
                <div className='JSX-container'>
                <Header/>
                <div className='page'>
                <Navigation/>
                <div className='page-content dashboard-content'>
                <ProjectsOverview/>
                </div>
                </div>
                </div>
