import React, { useEffect } from "react";
import "../Main/Main.css";
import { useDispatch, useSelector } from 'react-redux'
import { getNotes } from '../../store/ducks/notes'
import Note from './Note'

const dispatch = useDispatch()
const currentNote = useSelector(state => state.currentNote)
const notes = useSelector(state => state.notes)
const tags = useSelector(state => state.tags)

