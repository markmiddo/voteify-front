import { Button } from 'components/ui/Button';
import { Title } from 'components/ui/Title';
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const SuccessMessage = ({ title, link }) => (
  <>
    <Title size="lg">{title}</Title>
    <Link href={link.to}>
      <Button className="mt20">{link.title}</Button>
    </Link>
  </>
);

SuccessMessage.propTypes = {
  title: PropTypes.string,
};

export default SuccessMessage;
