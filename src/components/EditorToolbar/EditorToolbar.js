/** @jsx jsx */
import { useContext } from "react"
import { jsx } from "theme-ui"
import { Flex, Box, Button } from "@theme-ui/components"
import copy from "clipboard-copy"

import { gql } from "apollo-boost"
import { useMutation } from "@apollo/react-hooks"

import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator"

import { SkinContext } from "../../context"

import { Toolbar } from "../Toolbar"
import { IconButton } from "../IconButton"
import { SvgIcon } from "../SvgIcon"

import { checkAndReplaceQuotes } from "../../utils/checkAndReplaceQuotes"

import {
  EXPAND_ICON,
  COLLAPSE_ICON,
  SETTINGS_ICON,
  COPY_ICON,
} from "../../utils/iconPaths"
import {
  SET_IS_EDITOR_WIDTH_COLLAPSED,
  SET_IS_EDITOR_HEIGHT_COLLAPSED,
  SET_IS_SETTINGS_OPEN,
} from "../../utils/const"

import { SET_DATABASE_THEME_BY_ID } from "../../utils/const"

const nameConfig = {
  dictionaries: [adjectives, colors, animals],
  separator: "-",
  length: 3,
}

const FORK_THEME_WITH_ID = gql`
  mutation ForkThemeWithIdMutation(
    $user_id: String!
    $theme_author: String!
    $theme_name: String!
    $theme_description: String!
    $theme_style: String!
    $theme_object: String!
  ) {
    forkThemeWithId(
      user_id: $user_id
      theme_author: $theme_author
      theme_name: $theme_name
      theme_description: $theme_description
      theme_style: $theme_style
      theme_object: $theme_object
    ) {
      ref
      user_id
      theme_author
      theme_name
      theme_description
      theme_style
      theme_object
    }
  }
`

export const EditorToolbar = () => {
  const { state, dispatch } = useContext(SkinContext)

  const [forkThemeWithId, { loading, error }] = useMutation(
    FORK_THEME_WITH_ID,
    {
      onCompleted({ forkThemeWithId }) {
        location.search = `?theme_id=${forkThemeWithId.ref}`

        dispatch({
          type: SET_DATABASE_THEME_BY_ID,
          databaseThemeById: {
            ...forkThemeWithId,
          },
        })
      },
    }
  )

  const handleFork = () => {
    forkThemeWithId({
      variables: {
        user_id: state.user.id,
        theme_author: state.user.user_metadata.full_name,
        theme_name: uniqueNamesGenerator(nameConfig),
        theme_description: "A fork of the default theme",
        theme_style: "light",
        theme_object: state.defaultThemeObject,
      },
    })
  }

  // TODO Netlify env vars are undefined, dunno why
  // console.log("SKIN_UI_USER_ID: ", process.env.SKIN_UI_USER_ID)
  // console.log(state.user && state.user.id)

  return (
    <Toolbar>
      <Flex
        sx={{
          alignItems: "center",
          flex: "1 1 auto",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <IconButton
            title={`${
              state.isEditorHeightCollapsed ? "Expand" : "Collapse"
            } Editor`}
            onClick={() =>
              dispatch({
                type: SET_IS_EDITOR_HEIGHT_COLLAPSED,
                isEditorHeightCollapsed: state.isEditorHeightCollapsed,
              })
            }
            sx={{
              display: ["block", "block", "block", "none"],
              transform: "rotate(-90deg)",
            }}
            aria-label={`${
              state.isEditorHeightCollapsed ? "Expand" : "Collapse"
            } Editor`}
            iconPath={
              state.isEditorHeightCollapsed ? COLLAPSE_ICON : EXPAND_ICON
            }
          />

          <IconButton
            title={`${
              state.isEditorWidthCollapsed ? "Expand" : "Collapse"
            } Editor`}
            onClick={() =>
              dispatch({
                type: SET_IS_EDITOR_WIDTH_COLLAPSED,
                isEditorWidthCollapsed: state.isEditorWidthCollapsed,
              })
            }
            sx={{
              display: ["none", "none", "none", "block"],
            }}
            aria-label={`${
              state.isEditorWidthCollapsed ? "Expand" : "Collapse"
            } Editor`}
            iconPath={
              state.isEditorWidthCollapsed ? COLLAPSE_ICON : EXPAND_ICON
            }
          />
        </Box>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <IconButton
            title="Copy Theme UI object"
            onClick={() =>
              copy(
                `export default \n${checkAndReplaceQuotes(
                  state.defaultThemeObject
                )}`
              )
            }
            aria-label="Copy Theme UI object"
            iconPath={COPY_ICON}
            sx={{
              color: "primary",
            }}
          />

          {state.user ? (
            <Box>
              {state.isUserOwner ||
              state.user.id === process.env.SKIN_UI_USER_ID ? (
                <Button
                  title="Theme Settings"
                  aria-label="Theme Settings"
                  onClick={() => {
                    dispatch({
                      type: SET_IS_SETTINGS_OPEN,
                      isSettingsOpen: state.isSettingsOpen,
                    })
                  }}
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    flexDirecton: "coloumn",
                    pl: 2,
                    ml: 2,
                  }}
                >
                  <SvgIcon
                    iconPath={SETTINGS_ICON}
                    sx={{
                      mr: 2,
                    }}
                  />
                  Settings
                </Button>
              ) : (
                <Button
                  onClick={() => handleFork()}
                  sx={{
                    ml: 2,
                  }}
                >
                  Fork
                </Button>
              )}
            </Box>
          ) : null}
        </Box>
      </Flex>
    </Toolbar>
  )
}
