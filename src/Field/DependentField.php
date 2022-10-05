<?php

namespace Insitaction\EasyAdminFieldsBundle\Field;

use EasyCorp\Bundle\EasyAdminBundle\Contracts\Field\FieldInterface;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use Symfony\Component\OptionsResolver\OptionsResolver;

class DependentField
{
    public static function adapt(FieldInterface $field, array $options): FieldInterface
    {
        $resolver = new OptionsResolver();
        self::configureOptions($resolver);

        $options = $resolver->resolve($options);

        if (!method_exists($field, 'setFormTypeOptions')) {
            return $field;
        }

        if (!$field instanceof ChoiceField && !$field instanceof AssociationField) {
            throw new \InvalidArgumentException(sprintf(
                "Adapted DependentField should be an instance of ChoiceField or AssociationField, instance of %s given",
                get_class($field)
            ));
        }

        return $field
            ->setFormTypeOptions([
                'row_attr' => [
                    'data-controller' => 'dependent-field',
                    'data-dependent-field-options' => self::encodeOptions($options),
                ],
            ]);
    }

    public static function encodeOptions(array $options)
    {
        return json_encode($options, JSON_THROW_ON_ERROR);
    }

    public static function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'fetch_on_init' => false,
        ]);

        $resolver->setRequired('callback_url');
        $resolver->setRequired('dependencies');

        $resolver->setAllowedTypes('callback_url', 'string');
        $resolver->setAllowedTypes('dependencies', 'string[]');
        $resolver->setAllowedTypes('fetch_on_init', 'boolean');
    }
}