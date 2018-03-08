/* eslint react/no-danger: "off" */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { withStyles, withTheme } from 'material-ui/styles';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

const styles = theme => ({
  container: {
    flexGrow: 1,
    margin: '1em',
    height: '90%',
  },
  card: {},
});

const Template = ({ data, classes }) => {
  const { markdownRemark: post } = data;
  const { frontmatter, html } = post;
  const { title, date } = frontmatter;

  return (
    <div className={classes.container}>
      <Helmet title={`${frontmatter.title} - My Blog`} />

      <Card className={classes.card}>
        <CardHeader title={title} subheader={date} />
        <Divider />
        <CardContent>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </CardContent>
      </Card>
    </div>
  );
};

Template.propTypes = {
  data: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        path
        tags
        excerpt
      }
    }
  }
`;

export default withStyles(styles)(Template);
