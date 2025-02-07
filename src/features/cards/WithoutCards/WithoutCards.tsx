import React, { useEffect } from 'react'
import s from './WithoutCards.module.scss'
import Button from '@mui/material/Button'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { routes } from '../../../app/routes/Routes'
import { BackPackArrow } from '../../../common/components/BackPackArrow/BackPackArrow'
import { getCardsTC, resetCardAC } from '../CardsList/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { useModal } from '../../../common/components/Modal/useModal'
import { AddCardModal } from '../../modals/cardsModals/AddCardModal'

type WithoutCardsType = {}

export const WithoutCards: React.FC<WithoutCardsType> = (props) => {
    const { addCardModal, toggleAddCardModal } = useModal()

    const dispatch = useAppDispatch()
    const { urlPackId } = useParams()
    const userId = useAppSelector((state) => state.auth.user._id)
    const packUserId = useAppSelector((state) => state.cards.packUserId)
    const me = userId === packUserId

    let navigate = useNavigate()

    const addCard = () => {
        toggleAddCardModal()
        return navigate(`/packs/my-packs/${urlPackId!}`)
    }

    useEffect(() => {
        dispatch(getCardsTC({ cardsPack_id: urlPackId! }))
        return () => {
            dispatch(resetCardAC())
        }
    }, [])

    return (
        <div className={s.friendListContainer}>
            <BackPackArrow />
            <div className={s.descriptionBlock}>
                {me ? (
                    <>
                        <span className={s.text}>This pack is empty. Click add new card to fill this pack</span>
                        <Button type={'submit'} variant={'contained'} color={'primary'} className={s.button} onClick={addCard}>
                            Add new card
                        </Button>
                    </>
                ) : (
                    <>
                        <span className={s.text}>This pack is empty.</span>
                        <NavLink to={routes.packsList}>
                            <Button type={'submit'} variant={'contained'} color={'primary'} className={s.button}>
                                {' '}
                                Back to pack list
                            </Button>
                        </NavLink>
                    </>
                )}
            </div>
            <AddCardModal title={'Add new card'} packId={urlPackId!} isShowing={addCardModal} hide={toggleAddCardModal} />
        </div>
    )
}
