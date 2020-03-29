/** @jsx jsx */
import { useContext, memo, Fragment } from "react"
import PropTypes from "prop-types"
import { jsx } from "theme-ui"
import netlifyIdentity from "netlify-identity-widget"
import {
  MenuButton as BurgerMenu,
  NavLink,
  Text,
  Button,
  Flex,
  Box,
  Divider,
} from "@theme-ui/components"

import { SkinContext } from "../../context"

import { ThemeWrapper } from "../ThemeWrapper"
import { Logo } from "../Logo"
import { Dropdown } from "../Dropdown"
import { SvgIcon } from "../SvgIcon"

import { ARROW_DOWN_ICON, ARROW_UP_ICON } from "../../utils/iconPaths"

import { useSiteMetadata } from "../../data/useSiteMetadata"

export const Header = memo(({ isEditorRoute, left }) => {
  const {
    site: {
      siteMetadata: {
        config: { sidebarWidth },
      },
    },
  } = useSiteMetadata()

  const { state, dispatch } = useContext(SkinContext)

  return (
    <ThemeWrapper>
      <Box
        as="header"
        sx={{
          borderBottomStyle: 0,
          borderBottomColor: "gray",
          borderBottomWidth: 1,
          backgroundColor: "background",
          height: "header",
          px: 3,
          py: 2,
          position: "fixed",
          width: "max",
          zIndex: theme => theme.zIndices.header,
          a: {
            ":focus": {
              outline: "none",
            },
          },
        }}
      >
        <Flex
          sx={{
            alignItems: "center",
            flexWrap: "wrap",
            height: "100%",
            justifyContent: "space-between",
            ml: "auto",
            width: [
              "auto",
              "auto",
              "auto",
              `${isEditorRoute ? `calc(100% - ${sidebarWidth}px)` : "auto"}`,
            ],
          }}
        >
          <Box
            sx={
              {
                // border: "1px solid red",
              }
            }
          >
            {left}
          </Box>

          <Box
            sx={
              {
                /**border: "1px solid blue" **/
              }
            }
          >
            {state.user ? (
              <Dropdown
                sx={{
                  textAlign: "right",
                }}
                trigger={(isMenuOpen, setIsMenuOpen) => (
                  <Button
                    variant="ghost"
                    onClick={() => setIsMenuOpen(true)}
                    sx={{
                      display: "inline-flex",
                      pr: 1,
                      textTransform: "none",
                    }}
                  >
                    {state.user.user_metadata.full_name}
                    <SvgIcon
                      iconPath={isMenuOpen ? ARROW_UP_ICON : ARROW_DOWN_ICON}
                      sx={{ ml: 2 }}
                    />
                  </Button>
                )}
              >
                <Box
                  sx={{
                    backgroundColor: "background",
                    borderStyle: 0,
                    borderColor: "gray",
                    borderWidth: 1,
                    display: "flex",
                    flexDirection: "column",
                    minWidth: "dropdown",
                    width: 140,
                  }}
                >
                  <NavLink href="/your-themes" sx={{ px: 3, py: 2 }}>
                    Your Themes
                  </NavLink>
                  <NavLink href="/editor" sx={{ px: 3, py: 2 }}>
                    Code Editor
                  </NavLink>
                  <NavLink href="/showcase" sx={{ px: 3, py: 2 }}>
                    Showcase
                  </NavLink>
                  <Divider sx={{ m: 0, color: "gray" }} />
                  <Button
                    variant="ghost"
                    onClick={() => netlifyIdentity.logout()}
                  >
                    Log out
                  </Button>
                </Box>
              </Dropdown>
            ) : (
              <Flex>
                <Button
                  variant="accent"
                  onClick={() => netlifyIdentity.open("signup")}
                >
                  Sign up
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => netlifyIdentity.open("login")}
                  sx={{
                    ml: 1,
                  }}
                >
                  Login
                </Button>
              </Flex>
            )}
          </Box>
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              width: ["auto", "auto", "auto", sidebarWidth],
            }}
          >
            {isEditorRoute && (
              <BurgerMenu
                title="Open Navigation"
                onClick={() =>
                  dispatch({ type: SET_IS_NAV_OPEN, isNavOpen: true })
                }
                sx={{
                  display: ["block", "block", "block", "none"],
                  mr: 3,
                }}
              />
            )}
            <Logo isElementVisible={true} />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flex: "1 1 auto",
            }}
          >
            <Box
              sx={{
                display: ["none", "flex", "flex", "flex"],
                flexDirection: "column",
                pl: [4, 4, 4, 0],
              }}
            >
              {isEditorRoute && !isLoading ? (
                <Fragment>
                  <Text
                    sx={{
                      color: "muted",
                    }}
                  >
                    {state.databaseThemeById.theme_name}
                  </Text>
                  <Text
                    sx={{
                      color: "muted",
                      fontSize: 0,
                    }}
                  >
                    {state.databaseThemeById.theme_description}
                  </Text>
                </Fragment>
              ) : (
                <Flex as="nav">
                  <NavLink href="/editor" sx={{ px: 3, py: 2 }}>
                    Editor
                  </NavLink>
                  <NavLink href="/showcase" sx={{ px: 3, py: 2 }}>
                    showcase
                  </NavLink>
                </Flex>
              )}
            </Box>

            <Box>
              {state.user ? (
                <Fragment>
                  <Dropdown
                    sx={{
                      textAlign: "right",
                    }}
                    trigger={(isMenuOpen, setIsMenuOpen) => (
                      <Button
                        variant="ghost"
                        onClick={() => setIsMenuOpen(true)}
                        sx={{
                          display: "inline-flex",
                          pr: 1,
                          textTransform: "none",
                        }}
                      >
                        {state.user.user_metadata.full_name}
                        <SvgIcon
                          iconPath={
                            isMenuOpen ? ARROW_UP_ICON : ARROW_DOWN_ICON
                          }
                          sx={{ ml: 2 }}
                        />
                      </Button>
                    )}
                  >
                    <Box
                      sx={{
                        backgroundColor: "background",
                        borderStyle: 0,
                        borderColor: "gray",
                        borderWidth: 1,
                        display: "flex",
                        flexDirection: "column",
                        minWidth: "dropdown",
                        width: 140,
                      }}
                    >
                      <NavLink href="/your-themes" sx={{ px: 3, py: 2 }}>
                        Your Themes
                      </NavLink>
                      <NavLink href="/editor" sx={{ px: 3, py: 2 }}>
                        Editor
                      </NavLink>
                      <NavLink href="/showcase" sx={{ px: 3, py: 2 }}>
                        showcase
                      </NavLink>
                      <Divider sx={{ m: 0, color: "gray" }} />
                      <Button
                        variant="ghost"
                        onClick={() => netlifyIdentity.logout()}
                      >
                        Log out
                      </Button>
                    </Box>
                  </Dropdown>
                </Fragment>
              ) : (
                <Button
                  variant="secondary"
                  onClick={() => netlifyIdentity.open()}
                  sx={{
                    ml: 3,
                  }}
                >
                  Login / Sign up
                </Button>
              )}
            </Box>
          </Box> */}
        </Flex>
      </Box>

      <Box sx={{ height: "header" }} />
    </ThemeWrapper>
  )
})

Header.defaultProps = {
  isEditorRoute: false,
}

Header.propTypes = {
  /** Boolean to control Menu Button and package text visibility */
  isEditorRoute: PropTypes.bool,

  /** Render content on the left */
  left: PropTypes.node,
}
